// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import LogoPng from 'static/img/logo/logotype-white.png'
import frontPic from './frontpic.png'
import Button from './../../Button'
import PropTypes from 'prop-types'

function HomePageHeader({ scrollToProject, scrollToEvent, scrollToContact }) {
  /*
    Använder inte formatted message för "Connecting..."" Eftersom det inte gick att få till highlighten. Det ska gå men lyckades inte
  
  */

  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <img className={styles.logoMobile} src={LogoPng} />
        <div className={styles.header_text}>
          <div className={styles.textColor}>
            Connecting Stockholm with KTH’s{' '}
            <span className={styles.halfHighLight}>top tier</span> tech students
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={() => scrollToContact()} color='homepage'>
              Work with us
            </Button>
          </div>
          <div>
            <span
              onClick={() => scrollToProject()}
              className={styles.pointerToProject}
            >
              The Project
            </span>
            <span
              onClick={() => scrollToEvent()}
              className={styles.pointerToEvents}
            >
              The Events
            </span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.logoDesktop} src={frontPic} />
        </div>
      </div>
    </div>
  )
}

export default HomePageHeader

HomePageHeader.propTypes = {
  scrollToProject: PropTypes.func.isRequired,
  scrollToEvent: PropTypes.func.isRequired,
  scrollToContact: PropTypes.func.isRequired,
}
