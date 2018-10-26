import React from 'react'
import PropTypes from 'prop-types'
import MemberImage from 'components/MemberImage'
import styles from './styles.css'

function CvHeader({ user }) {

  return (
    <div className={styles.header}>
      <div className={styles.contactWrapper}>
        <MemberImage
          picture={user.picture}
          size={'100'}
          square
          round />
        <div className={styles.contact}>
          <div><b>{user.firstName} {user.lastName}</b></div>
          <div>{user.position} @ Studs</div>
          <div>Studying {user.master} @ KTH</div>
          {user.email && <div><a href={`mailto:${user.email}`}>{user.email}</a></div>}
          {user.phone && <div><a href={`tel:${user.phone}`}>{user.phone}</a></div>}
          {user.linkedIn && <div><a href={user.linkedIn}>LinkedIn</a></div>}
        </div>
      </div>
    </div>
  )
}

CvHeader.propTypes = {
  user: PropTypes.object.isRequired,
}

export default CvHeader
