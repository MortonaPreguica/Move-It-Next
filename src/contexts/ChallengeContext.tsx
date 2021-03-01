import {createContext, ReactNode, useEffect, useState} from 'react'
import Cookie from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'


export const ChallengeContext =  createContext({} as ChallengeProviderData)

interface Challenge {
  type: 'body' | 'eve',
  description: string;
  amount: number;
}

interface ChallengeProviderData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  activeChallenge: Challenge,
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengeProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export function ChallengeProvider({ 
  children, 
  ...rest
  }: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0)
  const [isLevelUpModalUp, setIsLevelUpModalOpen] = useState(false)
  const [activeChallenge, setActiveChalllenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Cookie.set('level', String(level))
    Cookie.set('currentExperience', String(currentExperience))
    Cookie.set('challengeCompleted', String(challengeCompleted))
  }, [level, currentExperience, challengeCompleted])

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length) 
    const challenge = challenges[randomChallengeIndex]

    setActiveChalllenge(challenge)

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio ', {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChalllenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return
    }

    const {amount} = activeChallenge

    let finalExperience = amount + currentExperience

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChalllenge(null)
    setChallengeCompleted(challengeCompleted + 1)
  }

  return (
    <ChallengeContext.Provider value={{
      level,
      currentExperience,
      challengeCompleted,
      activeChallenge,
      experienceToNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      {isLevelUpModalUp && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}