import styles from '../styles/components/ExperienceBar.module.css'

import {ChallengeContext} from '../contexts/ChallengeContext'
import { useContext } from 'react'

export default function ExperienceBar() {
  const {currentExperience, experienceToNextLevel} = useContext(ChallengeContext)
  
  const percentNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div >
        <div style={{ width: `${percentNextLevel}` }}/>  

        <span className={styles.currentExperience} style={{left:`${percentNextLevel}`}}>{currentExperience} </span>
      </div>
      <span> {experienceToNextLevel} xp</span>
    </header>
  )
}