import { useContext } from 'react'
import styles from '../styles/components/challengeBox.module.css'

import {ChallengeContext} from '../contexts/ChallengeContext'
import { CountdownContext } from '../contexts/CountdownContext'

export default function ChallengeBox() {
  const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext)
  const {resetCountdown} = useContext(CountdownContext)
  
  function handleChallengeComplete() {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }
  
  return(
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img  src={`icons/${activeChallenge.type}.svg`}/>
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type='button'
              className={styles.failedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type='button'
              className={styles.completedButton}
              onClick={handleChallengeComplete}
            >
              Completei
            </button>
          </footer>

        </div>
      ): (
      <div className={styles.challengeBoxContainer}>
        <strong>Finalize um ciclo para receber um desafio.</strong>
        <p>
          <img src='icons/level-up.svg' alt='Level Up'/>
          Avance de level completando os desafios.
        </p>
      </div>
      )}
    </div>
    
  )
}