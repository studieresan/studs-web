import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import styles from './styles.css'
import Navbar from 'containers/Navbar'
import ScrollContainer from 'containers/ScrollContainer'
import * as actions from './actions'

function App({ children, loggedIn, getUser }) {
  const [_loggedIn, setLoggedIn] = useState(false)
  useEffect(
    () => {
      if (!_loggedIn && loggedIn) {
        getUser()
      }
      setLoggedIn(loggedIn)
    },
    [loggedIn]
  )

  return (
    <ScrollContainer>
      <div className={styles.container}>
        <Navbar />
        {children}
      </div>
    </ScrollContainer>
  )
}

App.propTypes = {
  children: PropTypes.node,
  loggedIn: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    loggedIn: state.getIn(['global', 'loggedIn']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
