import React from 'react'
import PropTypes from 'prop-types'
import MemberImage from 'components/MemberImage'
import styles from './styles.css'
import placeholder from 'static/img/profile-placeholder.png'

const MemberImageTime = ({ picture, createdAt, name }) => {
  return (
    <div className={styles.container}>
      <MemberImage
        picture={picture ? picture : placeholder}
        size={name ? ' 80' : '85'}
        square
        round
      />
      {name ? <div className={styles.name_text}>{name}</div> : null}
      {createdAt ? (
        <div className={styles.small_text}>
          {new Date(createdAt).toLocaleDateString() +
            ' ' +
            new Date(createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
        </div>
      ) : null}
    </div>
  )
}

MemberImageTime.propTypes = {
  picture: PropTypes.string,
  createdAt: PropTypes.string,
  name: PropTypes.string,
}

export default MemberImageTime
