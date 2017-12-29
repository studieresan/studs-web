import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
// import moment from 'moment' TODO do this without adding a dependecy
import Markdown from 'react-markdown'

const PublicEvent = ({event}) => {
  if (!event) {
    return null
  }

  return (
    <div name={event.id} className={styles.publicEvent}>
      <div className={styles.information}>
        <h1>{ event.company.name }</h1>
        <h2>
          {/* TODO
            moment(event.date).format('MMMM Do') } @ { event.company.address
          */}
        </h2>
        <Markdown source={event.public_text}/>
      </div>
      <div className={styles.pictures}>
        <img src={event.picture_1}/>
        <img src={event.picture_2}/>
        <img src={event.picture_3}/>
      </div>
    </div>
  )
}

PublicEvent.propTypes = {
  event: PropTypes.object.isRequired,
}

export default PublicEvent
