// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { Map } from 'immutable'
import { hasEventPermission } from '../../users'

type State = {|
  hasPermission: boolean,
  loggedIn: boolean,
  hasFetchedLoggedInUser: boolean,
|}

type Props = {
  ...State,
  component: React.ComponentType<any>,
}

function EventRoute({
  component: Component,
  hasFetchedLoggedInUser,
  loggedIn,
  hasPermission,
  ...rest
}: Props) {
  if (!hasFetchedLoggedInUser && loggedIn) {
    // The user is logged in, but the user object hasn't loaded yet
    return null
  }

  // User is logged in, only show Component if they have event permissions
  return (
    <Route
      {...rest}
      render={props =>
        hasPermission ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  )
}

function mapStateToProps(state: Map<string, any>): State {
  const user: Map<string, any> = state.getIn(['global', 'user']) || Map()

  return {
    hasPermission: hasEventPermission(user.toJS()),
    loggedIn: state.getIn(['global', 'loggedIn']) || false,
    hasFetchedLoggedInUser:
      state.getIn(['global', 'hasFetchedLoggedInUser']) || false,
  }
}

export default connect(
  mapStateToProps,
  null
)(EventRoute)
