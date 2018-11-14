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
import CreateUser from 'containers/CreateUser'
import CvEdit from 'containers/CvEdit'
import Events from 'containers/Events'
import About from 'containers/About'
import NotFoundPage from 'containers/NotFoundPage'
import AdminRoute from 'containers/AdminRoute'
import AuthenticatedRoute from 'containers/AuthenticatedRoute'
import PublicEvents from 'containers/PublicEvents'
import OldEvents from 'containers/OldEvents'

class StudsRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/user/forgot-password' component={ForgotPassword} />

        <Route exact path='/password-reset/:token' component={PasswordReset} />
        <Route exact path='/events/public' component={PublicEvents} />
        <Route exact path='/events/old' component={OldEvents} />
        <AuthenticatedRoute exact path='/user' component={User} />
        <AuthenticatedRoute exact path='/resume/edit' component={CvEdit} />
        <AdminRoute exact path='/create-user' component={CreateUser} />

        <AuthenticatedRoute exact path='/members' component={Members} />
        <AuthenticatedRoute exact path='/members/:id?' component={Members} />

        <AuthenticatedRoute exact path='/events' component={Events} />
        <AuthenticatedRoute exact path='/events/new' component={Events} />
        <AuthenticatedRoute exact path='/events/:id' component={Events} />
        <AuthenticatedRoute exact path='/events/:id/edit' component={Events} />

        <Route exact path='/about' component={About} />

        <Route exact path='*' component={NotFoundPage} />
      </Switch>
    )
  }
}

export default withRouter(
  connect(
    null,
    null
  )(StudsRouter)
)
