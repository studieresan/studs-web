import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, withRouter } from 'react-router'

import { logout } from '../App/actions';

class Logout extends Component {
  componentWillMount() {
    localStorage.token = null
    this.props.logout();
    browserHistory.replace('/')
  }

  render() {
    return null
  }
}

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    logout: () => dispatch(logout())
  };
}

export default connect(null, mapDispatchToProps)(withRouter(Logout))
