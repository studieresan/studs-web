import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import Isvg from 'react-inlinesvg'
import NavbarWaypoint from 'containers/NavbarWaypoint'
import Logo from 'static/img/logo/White + Frame (16x10).svg'
import { Link } from 'react-router-dom'
import styles from './styles.css'

import messages from './messages'
import * as actions from 'containers/App/actions'

class HomePageHeader extends Component {
  render() {
    return (
      <NavbarWaypoint>
        <div className={styles.header}>
          <div className={styles.headerContent} >
            <div className={styles.headerContentLogo}>
              <Isvg src={Logo} />
            </div>
            <p>
              <FormattedMessage {...messages.intro.content} />
            </p>
            <Link to="/student" style={{color: 'white', fontSize: '28px'}}>
              <FormattedMessage {...messages.intro.application} />
            </Link>
          </div>
        </div>
      </NavbarWaypoint>
    )
  }
}

HomePageHeader.propTypes = {
  setNavbarBackground: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(null, mapDispatchToProps)(HomePageHeader)
