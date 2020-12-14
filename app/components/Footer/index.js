import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Facebook, Instagram, Linkedin } from 'react-feather'
import MemberImage from 'components/MemberImage'
import { projectManager1, projectManager2 } from 'static/groups/groups.js'
import Spotify from 'static/img/company_logos/spotify.png'
import Kry from 'static/img/company_logos/kry.svg'
import Cygni from 'static/img/company_logos/cygni.png'
import Trafikverket from 'static/img/company_logos/trafikverket.png'
import Storytel from 'static/img/company_logos/storytel.svg'
import Menu from './Menu'
import styles from './styles.css'
import messages from './messages'
import SalesContact from 'components/SalesContact'

function Footer({ showSalesContact, showCollaborators, hasBackground }) {
  return (
    <footer>
      {showSalesContact && <SalesContact />}
      <div
        className={
          styles.footer + ' ' + (hasBackground ? styles.footerBackground : '')
        }
      >
        <div className={styles.content}>
          <Menu hasBackground={hasBackground} />
          <Images />
          <Contact hasBackground={hasBackground} />
        </div>
        {showCollaborators && <Collaborations />}
        <SubFooter hasBackground={hasBackground} />
      </div>
    </footer>
  )
}

Footer.propTypes = {
  showSalesContact: PropTypes.bool,
  showCollaborators: PropTypes.bool,
  hasBackground: PropTypes.bool,
}

const Social = ({ hasBackground }) => (
  <div
    className={
      styles.social + ' ' + (hasBackground ? styles.socialColorInverted : '')
    }
  >
    <a href='http://facebook.com/studskth'>
      <Facebook color='#3b5998' size={24} />
    </a>
    <a href='http://instagram.com/studskth'>
      <Instagram color='#d6249f' size={24} />
    </a>
    <a href='https://www.linkedin.com/company/studs/'>
      <Linkedin color='#2867B2' size={24} />
    </a>
  </div>
)

Social.propTypes = {
  hasBackground: PropTypes.bool,
}

const Collaborations = () => (
  <div className={styles.collaborations}>
    <h5 className={styles.collaborationsHeader}>
      <FormattedMessage {...messages.collaborationsTitle} />
    </h5>
    <div className={styles.collaborationImages}>
      <CompanyImage picture={Spotify} />
      <CompanyImage picture={Trafikverket} />
      <CompanyImage picture={Storytel} />
      <CompanyImage picture={Kry} />
      <CompanyImage picture={Cygni} />
    </div>
  </div>
)

const SubFooter = ({ hasBackground }) => (
  <div className={styles.subfooter}>
    <Copyright hasBackground={hasBackground} />
    <Social hasBackground={hasBackground} />
  </div>
)

SubFooter.propTypes = {
  hasBackground: PropTypes.bool,
}

const Copyright = ({ hasBackground }) => (
  <p
    className={
      styles.copyright +
      ' ' +
      (hasBackground ? styles.copyrightColorInverted : '')
    }
  >
    &copy; 2020-2021 Studs
  </p>
)

Copyright.propTypes = {
  hasBackground: PropTypes.bool,
}

const Images = () => (
  <div className={styles.pictures}>
    <Image picture={projectManager1.image} />
    <Image picture={projectManager2.image} />
  </div>
)

const Contact = ({ hasBackground }) => (
  <div
    className={
      styles.contact + ' ' + (hasBackground ? styles.contactColorInverted : '')
    }
  >
    <div className={styles.section}>
      <div className={styles.contactDetails}>
        <h5 className={styles.contactHeader}>
          <FormattedMessage {...messages.projectManagerHeader} />
        </h5>
        <p>
          {projectManager1.name}{' '}
          <a href={'mailto:' + projectManager1.email}>
            {projectManager1.email}
          </a>
        </p>
        <p>
          {projectManager2.name}{' '}
          <a href={'mailto:' + projectManager2.email}>
            {projectManager2.email}
          </a>
        </p>
        <p>
          <FormattedMessage {...messages.projectManagerTitle} />
        </p>
      </div>
    </div>
  </div>
)

Contact.propTypes = {
  hasBackground: PropTypes.bool,
}

const CompanyImage = ({ picture }) => (
  <MemberImage
    className={styles.companyImage}
    picture={picture}
    size={200}
    square
  />
)

CompanyImage.propTypes = {
  picture: PropTypes.string.isRequired,
}

const Image = ({ picture }) => (
  <MemberImage
    className={styles.contactPicture}
    picture={picture}
    size={119}
    square
    round
  />
)

Image.propTypes = {
  picture: PropTypes.string.isRequired,
}

export default Footer
