import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import Isvg from 'react-inlinesvg'
import Waypoint from 'react-waypoint'
import Logo from 'static/img/logo/White + Frame (16x10).svg'
import styles from './styles.css'
import messages from './messages'
import * as actions from 'containers/App/actions'


class HomePageHeader extends Component {
  constructor(props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  handleEnter() {
    this.props.setNavbarBackground(false)
  }

  handleLeave() {
    this.props.setNavbarBackground(true)
  }

  render() {
    return (
      <Waypoint onEnter={this.handleEnter} onLeave={this.handleLeave}>
        <div className={styles.header}>
          <div className={styles.headerContent} >
            <div className={styles.headerContentLogo}>
              <Isvg src={Logo} />
            </div>
            <p>
              <FormattedMessage {...messages.intro.content} />
            </p>
          </div>
        </div>
      </Waypoint>
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
