import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
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
            { moment(date).format('YYYY-MM-DD') }
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
        { pictures && pictures.map(pic => <img key={pic} src={pic} /> )}
      </div>
      <div className={styles.divider} />
    </div>
  )
}

PublicEvent.propTypes = {
  companyName: PropTypes.string.isRequired,
  date: PropTypes.PropTypes.instanceOf(Date).isRequired,
  adress: PropTypes.string,
  publicDescription: PropTypes.string,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PublicEvent
