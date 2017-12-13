/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Members/actions'

import {
  HomePageHeader,
  HomePagePitch,
  HomePageSalesContact,
} from 'components/HomePage'

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
    <div>
      <HomePageHeader />
      <HomePagePitch />
      <HomePageSalesContact />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
