// @flow
import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'

const LightNav = props => <Nav {...props} invert />

type Props = {|
  +printMode: boolean,
|}

/**
 * Use a different variation of the navbar depending on which
 * page you are in currently.
 * @return {null} or a component
 */
function Navbar({ printMode }: Props) {
  if (printMode) {
    return null
  }
  return (
    <Switch>
      <Route exact path='/' render={LightNav} />
      <Route path='/login' render={LightNav} />
      <Route component={Nav} />
    </Switch>
  )
}

const mapStateToProps = state => {
  return {
    printMode: state.getIn(['global', 'printMode']),
  }
}

export default withRouter(connect(mapStateToProps)(Navbar))
