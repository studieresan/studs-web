// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Nav from './Nav'

const LightNav = props => <Nav {...props} invert />

/**
 * Use a different variation of the navbar depending on which
 * page you are in currently.
 */
function Navbar() {
  // For some reason, using `component` instead of `render` makes
  // the transition from light to dark and vice versa janky, but it's
  // smooth when using render
  return (
    <Switch>
      <Route exact path='/' render={LightNav} />
      <Route path='/login' render={LightNav} />
      <Route path='/events/:eventId/event-feedback' render={() => null} />
      <Route component={Nav} />
    </Switch>
  )
}

export default Navbar
