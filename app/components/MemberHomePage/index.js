import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

function MemberHomePage({ user }) {
  const { firstName, position, picture } = user
  return (
    <div className={styles.member}>
      <img width='20rem' height='auto' src={picture} />
      <h5 className={styles.name}>
        { firstName }
      </h5>
      <h5 className={styles.position}>
        { position }
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
