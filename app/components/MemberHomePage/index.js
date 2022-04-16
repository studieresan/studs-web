import React from 'react'
import PropTypes from 'prop-types'
import MemberImage from '../../components/MemberImage'
import styles from './styles.css'
import { prettyUserRole } from '../../utils'

function MemberHomePage({ user }) {
  const { firstName, lastName, userRole, picture } = user
  return (
    <div className={styles.member}>
      <MemberImage picture={picture} size='20rem' />
      <h3 className={styles.name}>{firstName + ' ' + lastName}</h3>
      <h5 className={styles.position}>{prettyUserRole(userRole)}</h5>
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
