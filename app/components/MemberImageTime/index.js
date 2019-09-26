import React from 'react'
import PropTypes from 'prop-types'
import MemberImage from 'components/MemberImage'
import styles from './styles.css'

const MemberImageTime = ({ picture, createdAt }) => {
  const formattedDate = new Date(createdAt)
  const prettyDate =
    formattedDate.toLocaleDateString() +
    ' ' +
    formattedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className={styles.container}>
      <MemberImage picture={picture} size={'90'} square round />
      <div className={styles.small_text}>{prettyDate}</div>
    </div>
  )
}

MemberImageTime.propTypes = {
  picture: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
}

export default MemberImageTime
