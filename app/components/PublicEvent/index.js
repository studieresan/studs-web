import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
// import moment from 'moment' TODO do this without adding a dependecy
import Markdown from 'react-markdown'

const PublicEvent = ({ companyName, publicDescription, pictures }) => (
  <div name={event.id} className={styles.publicEvent}>
    <div className={styles.information}>
      <h1 className={styles.companyName}>
        { companyName }
      </h1>
      <h2>
        {/* TODO
          moment(event.date).format('MMMM Do') } @ { event.company.address
        */}
      </h2>
      <div className={styles.description}>
        <Markdown source={publicDescription} />
      </div>
    </div>
    <div className={styles.pictures}>
      { pictures.map(pic => <img key={pic} src={pic} />) }
    </div>
  </div>
)

PublicEvent.propTypes = {
  companyName: PropTypes.string.isRequired,
  publicDescription: PropTypes.string.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PublicEvent
