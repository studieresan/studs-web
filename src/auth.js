import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export function setLoggedIn() {
  localStorage.loggedIn = 'true'
}

export function setLoggedOut() {
  localStorage.loggedIn = null
}

export function loggedIn() {
  return localStorage.loggedIn === 'true'
}

const Auth = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={ (props) => authenticated
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}} />}
    />
  )
}
Auth.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => (
  { authenticated: state.getIn(['global', 'loggedIn' ]) }
)

export const AuthenticatedRoute = connect(mapStateToProps, null)(Auth)
