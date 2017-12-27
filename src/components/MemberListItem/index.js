import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


import styles from './styles.css'

function MemberListItem(props) {
  const { user } = props
  return (
    <div className={styles.container}>
      <Link to={'/members/' + user.id}>
        <div className={styles.memberListItem}>
          <div className={styles.name}>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </Link>
    </div>
  )
}

MemberListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
}

export default MemberListItem
