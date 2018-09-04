import React from 'react'
import PropTypes from 'prop-types'
import StudsRecruitmentRoleModel from '../../models/StudsRecruitmentRoleModel'
import styles from './styles.css'

const RecruitmentRole = ({ role }) => {
  return (
    <div className={styles.roleContainer}>
      <h3 className={styles.title}>{role.title}</h3>
      <p className={styles.description}>{role.description}</p>
    </div>
  )
}

RecruitmentRole.propTypes = {
  role: PropTypes.PropTypes.instanceOf(StudsRecruitmentRoleModel).isRequired,
}

export default RecruitmentRole
