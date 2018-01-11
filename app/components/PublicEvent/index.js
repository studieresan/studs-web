import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'
import Markdown from 'react-markdown'

const PublicEvent = ({ companyName, date, adress, publicDescription, pictures }) => {
  return (
    <div name={companyName} className={styles.publicEvent}>
      <div className={styles.text}>
        <div className={styles.info}>
          <h1 className={styles.companyName}>
            { companyName }
          </h1>
          <h5 className={styles.date}>
            { date }
          </h5>
          <h5 className={styles.adress}>
            { adress }
          </h5>
        </div>
        <div className={styles.description}>
          <Markdown source={publicDescription} />
        </div>
      </div>
      <div className={styles.pictures}>
        { pictures.map(pic => <img key={pic} src={pic} /> )}
      </div>
      <div className={styles.divider} />
    </div>
  )
}

PublicEvent.propTypes = {
  companyName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  publicDescription: PropTypes.string.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PublicEvent
