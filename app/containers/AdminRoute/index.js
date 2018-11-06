// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { Map } from 'immutable'
import { hasAdminPermission } from '../../users'

type State = {|
  isAdmin: boolean,
  loggedIn: boolean,
  hasFetchedLoggedInUser: boolean,
|}

type Props = {
  ...State,
  component: React.ComponentType<any>,
}

function AdminRoute({
  component: Component,
  hasFetchedLoggedInUser,
  loggedIn,
  isAdmin,
  ...rest
}: Props) {
  if (!hasFetchedLoggedInUser && loggedIn) {
    // The user is logged in, but the user object hasn't loaded yet
    return null
  }

  // User is logged in, only show Component if they have admin permissions
  return (
    <Route
      {...rest}
      render={props =>
        isAdmin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

function mapStateToProps(state: Map<string, any>): State {
  const user: Map<string, any> = state.getIn(['global', 'user']) || Map()

  return {
    isAdmin: hasAdminPermission(user),
    loggedIn: state.getIn(['global', 'loggedIn']) || false,
    hasFetchedLoggedInUser:
      state.getIn(['global', 'hasFetchedLoggedInUser']) || false,
  }
}

export default connect(
  mapStateToProps,
  null,
)(AdminRoute)
