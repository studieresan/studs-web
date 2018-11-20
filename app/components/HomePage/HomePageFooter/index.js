import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Facebook, Instagram, Github } from 'react-feather'
import MemberImage from 'components/MemberImage'
import Emma from 'static/img/people/emma.jpg'
import Andreas from 'static/img/people/andreas.jpg'
import Menu from './Menu'
import styles from './styles.css'
import messages from './messages'

function HomePageFooter() {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <Menu />
        <Images />
        <Contact />
      </div>
      <SubFooter />
    </div>
  )
}

const Social = () => (
  <div className={styles.social}>
    <a href='http://facebook.com/studskth'>
      <Facebook color='#3b5998' size={24} />
    </a>
    <a href='http://instagram.com/studskth'>
      <Instagram color='#d6249f' size={24} />
    </a>
    <a href='http://github.com/studieresan'>
      <Github color='#6cc644' size={24} />
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
    &copy; 2018-2019 Studs
  </p>
)

const Images = () => (
  <div className={styles.pictures}>
    <Image picture={Andreas} round />
    <Image picture={Emma} round />
  </div>
)

const Contact = () => (
  <div className={styles.contact}>
    <div className={styles.section}>
      <div className={styles.contactDetails}>
        <h5 className={styles.contactHeader}>
          <FormattedMessage {...messages.projectManagerHeader} />
        </h5>
        <p>Andreas Heiskanen &amp; Emma Nimstad</p>
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
  </div>
)

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
  picture: PropTypes.string.isRequird,
}

export default HomePageFooter
