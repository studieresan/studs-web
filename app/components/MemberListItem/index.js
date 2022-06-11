import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import styles from './styles.css'
import { trackEvent } from '../../utils'

const MemberListItem = ({ user, selectMember, active }) => {
  const style = classnames(styles.memberListItem, styles.container, {
    [styles.active]: active,
  })
  return (
    <div
      className={style}
      onClick={() => {
        trackEvent('Cvs', `Selected ${user.firstName} ${user.lastName} CV`)
        selectMember(user)
      }}
    >
      <div className={style}>
        <div className={styles.name}>
          {user.firstName} {user.lastName}
        </div>
      </div>
    </div>
  )
}

MemberListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  selectMember: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
}

export default MemberListItem
