// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HeroNav from './HeroNav'

const LightNav = props => <HeroNav {...props} invert />

/**
 * Use a different variation of the navbar depending on which
 * page you are in currently.
 */
function Navbar() {
  return (
    <Switch>
      <Route exact path="/" render={LightNav} />
      <Route path="/login" render={LightNav} />
      <Route component={HeroNav} />
    </Switch>
  )
}

export default Navbar
