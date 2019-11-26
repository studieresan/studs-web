import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Members/actions'

import { HomePageHeader, HomePageContent } from 'components/HomePage'

import Footer from 'components/Footer'

export class HomePage extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        {/* <HomePageHeader /> */}
        <HomePageContent />
        <Footer />
      </div>
    )
  }
}

HomePage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    users: state.getIn(['members', 'users']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
