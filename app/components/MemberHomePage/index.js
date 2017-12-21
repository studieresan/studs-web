import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

function MemberHomePage({ user }) {
  const { firstName, lastName } = user
  const pic = `${process.env.CDN_URL}/members/${firstName.toLowerCase()}-${lastName.toLowerCase()}.jpg`
  return (
    <div className={styles.member}>
      <img width='20rem' height='auto' src={pic} />
      <h5 className={styles.name}>
        { user.firstName }
      </h5>
    </div>
  )
}

MemberHomePage.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    picture: PropTypes.string,
  }).isRequired,
}

export default MemberHomePage
