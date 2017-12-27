/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import styles from './styles.css'
import Navbar from 'containers/Navbar'
import * as actions from './actions'

class App extends React.Component {

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.getUser()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      this.props.getUser()
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Navbar />
        { this.props.children }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
  loggedIn: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']),
    fetchingUser: state.getIn(['global', 'fetchingUser']),
    loggedIn: state.getIn(['global', 'loggedIn']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
