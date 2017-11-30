import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Project from 'static/img/home/project-1.jpg'
import Event from 'static/img/home/event-1.jpg'
import Trip from 'static/img/home/trip-1.jpg'

import messages from './messages'
import styles from './styles.css'

function HomePagePitch() {
  return (
    <div className={styles.pitch}>
      <h1 className={styles.headline}>
        <FormattedMessage {...messages.headline} />
      </h1>
      <Section image={Project} {...messages.project} />
      <Section image={Event} {...messages.events} />
      <Section image={Trip} {...messages.trip} />
    </div>
  )
}

function Section({ image, header, content }) {
  return (
  <div className={styles.section}>
    <div className={styles.images}>
      <img className={styles.image} src={image} />
    </div>
    <div className={styles.text}>
      <h2 className={styles.header}>
        <FormattedMessage {...header} />
      </h2>
      <p className={styles.body}>
        <FormattedMessage {...content} />
      </p>
    </div>
  </div>
  )
}

Section.propTypes = {
  image: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default HomePagePitch
