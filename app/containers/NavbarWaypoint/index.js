import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import * as actions from 'containers/App/actions'

class NavbarWaypoint extends Component {
  constructor(props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  componentWillUnmount() {
    this.props.setNavbarBackground(true)
  }

  handleEnter() {
    this.props.setNavbarBackground(false)
  }

  handleLeave() {
    this.props.setNavbarBackground(true)
  }

  render() {
    return (
      <Waypoint
        scrollableAncestor={window}
        onEnter={this.handleEnter}
        onLeave={this.handleLeave}
      >
        <div>{this.props.children}</div>
      </Waypoint>
    )
  }
}

NavbarWaypoint.propTypes = {
  children: PropTypes.node.isRequired,
  setNavbarBackground: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(NavbarWaypoint)
