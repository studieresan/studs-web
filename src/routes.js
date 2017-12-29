import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import HomePage from 'containers/HomePage'
import Members from 'containers/Members'
import Logout from 'containers/Logout'
import Login from 'containers/Login'
import ForgotPassword from 'containers/ForgotPassword'
import PasswordReset from 'containers/PasswordReset'
import User from 'containers/User'
import CvEdit from 'containers/CvEdit'
import PublicEvents from 'containers/PublicEvents'
import Events from 'containers/Events'
import Trip from 'containers/Trip'
import NotFoundPage from 'containers/NotFoundPage'
/* TODO
import { requireAuth } from './auth'
 */

class StudsRouter extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/logout' component={Logout}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/user/forgot-password' component={ForgotPassword}/>

        <Route exact path='/password-reset/:token' component={PasswordReset}/>
        <Route exact path='/user' component={User}/>
        <Route exact path='/resume/edit' component={CvEdit}/>

        <Route path='/members' component={Members}/>

        <Route exact path='/events/public' component={PublicEvents}/>
        <Route exact path='/events' component={Events}/>
        <Route exact path='/events/new' component={Events}/>
        <Route exact path='/events/:id' component={Events}/>
        <Route exact path='/events/:id/edit' component={Events}/>

        <Route exact path='/events/trip' component={Trip}/>

        <Route exact path='*' component={NotFoundPage}/>
      </Switch>
    )
  }
}
export default withRouter(connect(null, null)(StudsRouter))
export function createRoutes() {
  // Create reusable async injectors using getAsyncInjectors factory
  // const {
  //   injectReducer,
  // } = getAsyncInjectors(store) // eslint-disable-line no-unused-vars

  // return [
  //   {
  //     path: '/',
  //     name: 'home',
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Members/reducer'),
  //         System.import('containers/HomePage'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) =>
  //       { injectReducer('members', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/login',
  //     name: 'login',
  //     getComponent(location, cb) {
  //       System.import('containers/Login')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '/logout',
  //     name: 'logout',
  //     getComponent(location, cb) {
  //       System.import('containers/Logout')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '/password-reset/:token',
  //     name: 'password_reset',
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/PasswordReset/reducer'),
  //         System.import('containers/PasswordReset'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('passwordReset', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/user',
  //     name: 'user',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/User/reducer'),
  //         System.import('containers/User'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('user', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/members',
  //     name: 'members',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Members/reducer'),
  //         System.import('containers/Members'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('members', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/members/:id',
  //     name: 'members',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Members/reducer'),
  //         System.import('containers/Members'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('members', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/resume/edit',
  //     name: 'cvEdit',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/CvEdit/reducer'),
  //         System.import('containers/CvEdit'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('cv', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/user/forgot-password',
  //     name: 'forgotPassword',
  //     getComponent(location, cb) {
  //       System.import('containers/ForgotPassword')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events',
  //     name: 'events',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Events/reducer'),
  //         System.import('containers/Events'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('events', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events/public',
  //     name: 'publicEvents',
  //     getComponent(location, cb) {
  //       System.import('containers/PublicEvents')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events/new',
  //     name: 'events/new',
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Events/reducer'),
  //         System.import('containers/Events'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('events', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events/:id',
  //     name: 'events',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Events/reducer'),
  //         System.import('containers/Events'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('events', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/events/:id/edit',
  //     name: 'events/edit',
  //     onEnter: requireAuth,
  //     getComponent(nextState, cb) {
  //       const importModules = Promise.all([
  //         System.import('containers/Events/reducer'),
  //         System.import('containers/Events'),
  //       ])

  //       const renderRoute = loadModule(cb)

  //       importModules.then(([reducer, component ]) => {
  //         injectReducer('events', reducer.default)
  //         renderRoute(component)
  //       })

  //       importModules.catch(errorLoading)
  //     },
  //   }, {
  //     path: '/trip',
  //     name: 'trip',
  //     getComponent(location, cb) {
  //       System.import('containers/Trip')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   }, {
  //     path: '*',
  //     name: 'notfound',
  //     getComponent(nextState, cb) {
  //       System.import('containers/NotFoundPage')
  //         .then(loadModule(cb))
  //         .catch(errorLoading)
  //     },
  //   },
  // ]
}
