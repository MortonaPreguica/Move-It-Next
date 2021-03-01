import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenges() {
  const {challengeCompleted} = useContext(ChallengeContext)
  
  return (
    <div className={styles.challengesContainer}>
      <span>Desafios Completados</span>
      <span>{challengeCompleted}</span>
    </div>
  )
}
