import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Project from 'static/img/home/project-1.jpg'
import Cinnober from 'static/img/home/cinnober.jpg'
import Tritech from 'static/img/home/tritech.jpg'
import SanFransisco from 'static/img/home/sanfrancisco.jpg'
import NewYork from 'static/img/home/newyork.jpg'

import messages from './messages'
import styles from './styles.css'

const ProjectNode = () => {
  return (
    <div className={styles.images}>
      <img id={styles.projectImage} className={styles.image} src={Project} />
    </div>
  )
}

const EventNode = () => {
  return (
    <div className={styles.images}>
      <div className={styles.eventImageContainer}>
        <img id={styles.tritech} className={styles.image} src={Tritech} />
        <img id={styles.cinnober} className={styles.image} src={Cinnober} />
      </div>
    </div>
  )
}

const TripNode = () => {
  return (
    <div className={styles.images}>
      <div className={styles.tripImageContainer}>
        <img
          id={styles.sanFransisco}
          className={styles.image}
          src={SanFransisco}
        />
        <img id={styles.newYork} className={styles.image} src={NewYork} />
      </div>
    </div>
  )
}

function HomePagePitch() {
  return (
    <div className={styles.pitch}>
      <h1 className={styles.headline}>
        <FormattedMessage {...messages.headline} />
      </h1>
      <Section {...messages.project}>
        <ProjectNode />
      </Section>
      <Section {...messages.events}>
        <EventNode />
      </Section>
      <Section {...messages.trip}>
        <TripNode />
      </Section>
    </div>
  )
}

function Section({ header, content, children }) {
  return (
    <div className={styles.section}>
      {children}
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
  header: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
  }).isRequired,
  content: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
}

export default HomePagePitch
