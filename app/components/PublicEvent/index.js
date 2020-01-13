import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './styles.css'
import Markdown from 'react-markdown'

const PublicEvent = ({
  companyName,
  date,
  publicDescription,
  pictures,
  index,
}) => {
  return (
    <div name={companyName} className={styles.publicEvent}>
      <div className={styles.header}>
        <h1 className={styles.companyName}>{companyName}</h1>
        <h5 className={styles.date}>{moment(date).format('DD MMMM')}</h5>
      </div>
      <div
        className={styles.content}
        style={{
          flexDirection: !(index % 2) ? 'row-reverse' : '',
        }}
      >
        <Markdown source={publicDescription} className={styles.description} />
        <div className={styles.padder} />
        {pictures && !!pictures.length && (
          <div className={styles.pictures}>
            {pictures.slice(0, 3).map(pic => (
              <img key={pic + Math.random()} src={pic} />
            ))}
          </div>
        )}
      </div>
      <div className={styles.divider} />
    </div>
  )
}

PublicEvent.propTypes = {
  companyName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  date: PropTypes.PropTypes.instanceOf(Date).isRequired,
  publicDescription: PropTypes.string,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PublicEvent
