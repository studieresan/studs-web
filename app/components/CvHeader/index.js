import React from 'react'
import PropTypes from 'prop-types'
import MemberImage from '../../components/MemberImage'
import { Linkedin } from 'react-feather'
import Github from 'react-feather/dist/icons/github'
import styles from './styles.css'
import { prettyUserRole } from '../../utils'

const convertToLink = link => {
  const temp = link.split('https://')
  return temp.length > 1 ? temp[1] : temp[0]
}

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
          <div>{prettyUserRole(user.userRole)} @ Studs</div>
          <div>Studying {user.master} @ KTH</div>
          {user.resumeEmail && (
            <div>
              <a href={`mailto:${user.resumeEmail}`}>{user.resumeEmail}</a>
            </div>
          )}
          {!user.resumeEmail && user.email && (
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
            href={'//' + convertToLink(user.linkedIn)}
            target='_blank'
            rel='noopener noreferrer'
            title='LinkedIn'
          >
            {convertToLink(user.linkedIn)}
            <Linkedin color='#333' size={24} />
          </a>
        )}
        {user.github && (
          <a
            href={'//' + convertToLink(user.github)}
            target='_blank'
            rel='noopener noreferrer'
            title='Github'
          >
            {convertToLink(user.github)}
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
