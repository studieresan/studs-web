import React from 'react'
// import PropTypes from 'prop-types'
// import { FormattedMessage } from 'react-intl'
import Isvg from 'react-inlinesvg'
import Logo from 'static/img/logo/Black.svg'
import styles from './styles.css'
// import messages from './messages'

function HomePageFooter() {
  return (
    <div className={styles.footer}>
      <Isvg src={Logo} />
    </div>
  )
}

HomePageFooter.propTypes = {
}

export default HomePageFooter
