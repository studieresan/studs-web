import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Facebook, Instagram, Linkedin } from 'react-feather'
import MemberImage from 'components/MemberImage'
import leader1 from 'static/img/people/leader1.jpg'
import leader2 from 'static/img/people/leader2.jpg'
import Spotify from 'static/img/company_logos/spotify.png'
import Kry from 'static/img/company_logos/kry.svg'
import Cygni from 'static/img/company_logos/cygni.png'
import Trafikverket from 'static/img/company_logos/trafikverket.png'
import Storytel from 'static/img/company_logos/storytel.svg'
import Menu from './Menu'
import styles from './styles.css'
import messages from './messages'
import SalesContact from 'components/SalesContact'

function Footer({ showSalesContact }) {
  return (
    <div>
      {showSalesContact && <SalesContact />}
      <div className={styles.footer}>
        <div className={styles.content}>
          <Menu />
          <Images />
          <Contact />
        </div>
        <Collaborations />
        <SubFooter />
      </div>
    </div>
  )
}

Footer.propTypes = {
  showSalesContact: PropTypes.bool,
}

const Social = () => (
  <div className={styles.social}>
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

const SubFooter = () => (
  <div className={styles.subfooter}>
    <Copyright />
    <Social />
  </div>
)

const Copyright = () => (
  <p className={styles.copyright}>&copy; 2020-2021 Studs</p>
)

const Images = () => (
  <div className={styles.pictures}>
    <Image picture={leader1} />
    <Image picture={leader2} />
  </div>
)

const Contact = () => (
  <div className={styles.contact}>
    <div className={styles.section}>
      <div className={styles.contactDetails}>
        <h5 className={styles.contactHeader}>
          <FormattedMessage {...messages.projectManagerHeader} />
        </h5>
        <p>
          Albin Winkelmann <a href='mailto:albin@studs.se'>albin@studs.se</a>
        </p>
        <p>
          Axel Lindeberg <a href='mailto:axel@studs.se'>axel@studs.se</a>
        </p>
        <p>
          <FormattedMessage {...messages.projectManagerTitle} />
        </p>
      </div>
    </div>
  </div>
)

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
