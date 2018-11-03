// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { List, Map } from 'immutable'

type Props = {
  component: React.Node,
  isAdmin: boolean,
}

function AdminRoute({ component: Component, isAdmin, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={() => (isAdmin ? Component : <Redirect to="/" />)}
    />
  )
}

function mapStateToProps(state: Map<string, any>) {
  const userPermissions: List<string> =
    state.getIn(['user', 'user', 'permissions']) || List()

  return {
    isAdmin: userPermissions.includes('admin'),
  }
}

export default connect(mapStateToProps, null)(AdminRoute)
