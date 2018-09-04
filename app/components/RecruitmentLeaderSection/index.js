import React from 'react'
import PropTypes from 'prop-types'
import StudsRecruitmentLeaderModel
  from '../../models/StudsRecruitmentLeaderModel'
import styles from './styles.css'
import RecruitmentRole from '../RecruitmentRole'

const RecruitmentLeaderSection = ({ recruitmentLeader }) =>
  <div className={styles.leaderSectionContainer}>
    <div className={styles.contactContainer}>
      <div className={styles.contactInfo}>
        <p>Har du frågor? Kontakta</p>
        <h4 className={styles.title}>{recruitmentLeader.leaderTitle}</h4>
        <h4 className={styles.name}>{recruitmentLeader.name}</h4>
        <a href={`mailto:${recruitmentLeader.email}`}>{recruitmentLeader.email}</a>
      </div>
      <img src={recruitmentLeader.imageUrl} className={styles.leaderImage}/>
    </div>
    <div className={styles.rolesContainer}>
      {recruitmentLeader.roles.map(role => <RecruitmentRole key={role.title} role={role}/>)}
    </div>
  </div>

RecruitmentLeaderSection.propTypes = {
  recruitmentLeader: PropTypes.PropTypes.instanceOf(StudsRecruitmentLeaderModel).isRequired,
}

export default RecruitmentLeaderSection
