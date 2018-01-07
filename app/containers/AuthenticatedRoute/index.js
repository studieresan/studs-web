import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={ (props) => authenticated
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}} />}
    />
  )
}
AuthenticatedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => (
  { authenticated: state.getIn(['global', 'loggedIn' ]) }
)

export default connect(mapStateToProps, null)(AuthenticatedRoute)
