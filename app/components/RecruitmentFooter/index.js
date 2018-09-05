import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const RecruitmentFooter = ({ onClickUrl, onClick }) =>
  <div className={styles.recruitmentFooter}>
    <div className={styles.buttonContainer}>
      <p><span className={styles.intro}>Vad väntar du på?</span> Sök Studs 2019 idag!</p>
      <a href={onClickUrl} target='_blank'>
        <button onClick={onClick}>Ansök nu »</button>
      </a>
    </div>
    <div className={styles.applicationInfo}>
      <p className={styles.period}>Ansökningsperiod 5 - 19 september</p>
      <p className={styles.interviewInfo}>Intervjuer hålls löpande</p>
    </div>
  </div>


RecruitmentFooter.propTypes = {
  onClickUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default RecruitmentFooter
