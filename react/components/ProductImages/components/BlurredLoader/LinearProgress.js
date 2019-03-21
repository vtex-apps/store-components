import React from 'react'
import styles from '../../styles.css'

export const LinearProgress = () => {
  return (
    <div class={`${styles.slider} w-100`}>
      <div class={`${styles.subline} ${styles.inc} bg-action-primary`} />
      <div class={`${styles.subline} ${styles.dec} bg-action-primary`} />
    </div>
  )
}
