import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'static/img/logo/black-frame.svg'
import MemberImage from 'components/MemberImage'
import styles from './styles.css'

function CvHeader({ user }) {

  return (
    <div className={styles.header}>
      <div className={styles.contactWrapper}>
        <MemberImage
          picture={user.picture}
          size={100}
          square
          round />
        <div className={styles.contact}>
          <div>{user.firstName} {user.lastName}</div>
          <div>{user.position} @ Studs</div>
          <div>Studying {user.master} @ KTH</div>
          <div><a href={`mailto:${user.email}`}>{user.email}</a></div>
          <div><a href={`tel:${user.phone}`}>{user.phone}</a></div>
          {user.linkedIn && <div><a href={user.linkedIn}>LinkedIn</a></div>}
        </div>
      </div>
      <div className={styles.logo}>
        <img src={Logo} />
      </div>
    </div>
  )
}

CvHeader.propTypes = {
  user: PropTypes.object.isRequired,
}

export default CvHeader
