import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import Isvg from 'react-inlinesvg'
import NavbarWaypoint from 'containers/NavbarWaypoint'
import Logo from 'static/img/logo/White + Frame (16x10).svg'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import styles from './styles.css'

import messages from './messages'
import * as actions from 'containers/App/actions'

class HomePageHeader extends Component {
  trackLearnMoreClick() {
    ReactGA.event({
      category: 'Application',
      action: 'Clicked learn more',
      label: 'Learn more button',
    })
  }

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
            <p>
              <FormattedMessage {...messages.intro.application} />
            </p>
            <Link to="/student">
              <button onClick={this.trackLearnMoreClick} className={styles.learnMoreButton}><FormattedMessage {...messages.intro.learnMore} /> »</button>
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
