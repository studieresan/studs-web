import React from 'react'
import PropTypes from 'prop-types'
import MemberImage from 'components/MemberImage'
import { Github, Linkedin } from 'react-feather'
import styles from './styles.css'

function CvHeader({ user }) {
  return (
    <div className={styles.header}>
      <div className={styles.contactWrapper}>
        <MemberImage picture={user.picture} size={'90'} square round />
        <div className={styles.contact}>
          <div>
            <b>
              {user.firstName} {user.lastName}
            </b>
          </div>
          <div>{user.position} @ Studs</div>
          <div>Studying {user.master} @ KTH</div>
          {user.email && (
            <div>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          )}
          {user.phone && (
            <div>
              <a href={`tel:${user.phone}`}>{user.phone}</a>
            </div>
          )}
        </div>
      </div>
      <div className={styles.social}>
        {user.linkedIn && (
          <a
            href={user.linkedIn}
            target='_blank'
            rel='noopener noreferrer'
            title='LinkedIn'
          >
            <Linkedin color='#333' size={24} />
          </a>
        )}
        {user.github && (
          <a
            href={user.github}
            target='_blank'
            rel='noopener noreferrer'
            title='Github'
          >
            <Github color='#333' size={24} />
          </a>
        )}
      </div>
    </div>
  )
}

CvHeader.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    master: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    linkedIn: PropTypes.string,
    github: PropTypes.string,
  }).isRequired,
}

export default CvHeader
