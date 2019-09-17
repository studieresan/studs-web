import React from 'react'
import PropTypes from 'prop-types'
import MemberImage from 'components/MemberImage'
import styles from './styles.css'

import { dateStringFromTimestamp, timeStringFromTimestamp } from '../../utils'

const MemberImageTime = ({ picture, timestamp }) => {
  return (
    <div className='profile-date-time-container'>
      <MemberImage picture={picture} size={'90'} square round />
      <div className='text-sm'>{dateStringFromTimestamp(timestamp)}</div>
      <div className='text-xs'>{timeStringFromTimestamp(timestamp)}</div>
    </div>
  )
}

MemberImageTime.propTypes = {
  picture: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
}

export default MemberImageTime
