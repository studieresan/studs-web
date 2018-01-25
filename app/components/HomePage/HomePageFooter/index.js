import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import Isvg from 'react-inlinesvg'
import { Facebook, Instagram, Github } from 'react-feather'
import MemberImage from 'components/MemberImage'
import Agnes from 'static/img/people/agnes.jpg'
import Sasha from 'static/img/people/sasha.jpg'
import Elin from 'static/img/people/elin.jpg'
import Logo from 'static/img/logo/black-frame.svg'
import styles from './styles.css'
import messages from './messages'
import navigationMessages from 'containers/Navbar/messages'

function HomePageFooter() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <Menu />
        <Contact />
      </div>
      <SubFooter />
    </div>
  )
}

HomePageFooter.propTypes = {}

const Menu = () => (
  <div className={styles.menu}>
    <div className={styles.logo}>
      <Isvg src={Logo} />
    </div>
    <Pitch />
    <nav className={styles.navigation}>
      <MenuItem to="about">
        <FormattedMessage {...navigationMessages.about} />
      </MenuItem>
      <MenuItem to="events">
        <FormattedMessage {...navigationMessages.events} />
      </MenuItem>
      <MenuItem to="trip">
        <FormattedMessage {...navigationMessages.trip} />
      </MenuItem>
      <MenuItem to="login">
        <FormattedMessage {...navigationMessages.login} />
      </MenuItem>
    </nav>

  </div>
)


const Pitch = () => (
  <p>
    <FormattedMessage {...messages.shortPitch} />
  </p>
)

const MenuItem = ({ to, children }) => (
  <Link to={to}>
    <h4>{ children }</h4>
  </Link>
)

MenuItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const Social = () => (
  <div className={styles.social}>
    <a href="http://facebook.com/studskth">
      <Facebook size={24} />
    </a>
    <a href="http://instagram.com/studskth">
      <Instagram size={24} />
    </a>
    <a href="http://github.com/studieresan">
      <Github size={24} />
    </a>
  </div>
)

const SubFooter = () => (
  <div className={styles.subfooter}>
    <Copyright />
    <Social />
  </div>
)

const Copyright = () => (
  <p className={styles.copyright}>
    &copy; 2017 Studs
  </p>
)

const Contact = () => (
  <div className={styles.contact}>
    <div className={styles.section}>
      <h5 className={styles.contactHeader}>
        <FormattedMessage {...messages.salesHeader} />
      </h5>
      <div className={styles.pictures}>
        <Image picture={Elin} />
      </div>
      <p><b>Elin Karagöz</b></p>
      <p>
        <FormattedMessage {...messages.salesTitle} />
      </p>
      <p>
        <a href="mailto:studs-salj@d.kth.se">
          studs-salj@d.kth.se
        </a>
      </p>
    </div>

    <div className={styles.section}>
      <h5 className={styles.contactHeader}>
        <FormattedMessage {...messages.projectManagerHeader} />
      </h5>
      <div className={styles.pictures}>
        <Image picture={Agnes} />
        <Image picture={Sasha} />
      </div>
      <p><b>Agnes Åman &amp; Sasha Hellstenius</b></p>
      <p>
        <FormattedMessage {...messages.projectManagerTitle} />
      </p>
      <p>
        <a href="mailto:studs-ansvarig@d.kth.se">
          studs-ansvarig@d.kth.se
        </a>
      </p>
    </div>
  </div>
)

const Image = ({ picture }) => (
  <MemberImage
    className={styles.contactPicture}
    picture={picture}
    size={75}
    square
    round
  />
)

Image.propTypes = {
  picture: PropTypes.string.isRequird,
}

export default HomePageFooter
