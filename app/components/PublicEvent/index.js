import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './styles.css'
import Markdown from 'react-markdown'
import LazyLoad from 'react-lazy-load'

const PublicEvent = ({
  companyName,
  id,
  date,
  publicDescription,
  pictures,
  index,
}) => {
  return (
    <article name={id} className={styles.publicEvent}>
      <hgroup className={styles.header}>
        <h1 className={styles.companyName}>{companyName}</h1>
        <h5 className={styles.date}>
          <time dateTime={moment(date).format('YYYY-MM-DD')}>
            {moment(date).format('DD MMMM YYYY')}
          </time>
        </h5>
      </hgroup>
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
              <LazyLoad
                key={pic + Math.random()}
                offsetVertical={300}
                debounce={false}
              >
                <img src={pic} />
              </LazyLoad>
            ))}
          </div>
        )}
      </div>
      <div className={styles.divider} />
    </article>
  )
}

PublicEvent.propTypes = {
  companyName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  date: PropTypes.PropTypes.instanceOf(Date).isRequired,
  publicDescription: PropTypes.string,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PublicEvent
