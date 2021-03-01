import { useContext } from 'react'
import styles from '../styles/components/Countdown.module.css'
import { CountdownContext } from '../contexts/CountdownContext'



export default function Countdown () {
  const {minutes, seconds, isActive, hasFineshed, startCountdown, resetCountdown} = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

    
      {hasFineshed ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo finalizado
        </button>
      ): (
        <>
          {isActive ? (
            <button 
              type='button'
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
            ) : (
            <button 
            type='button'
            className={styles.countdownButton}
            onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
      
    
      
    </div>
  )
}