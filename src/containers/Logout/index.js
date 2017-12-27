import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, withRouter } from 'react-router-dom'

import { logout } from '../App/actions'

class Logout extends Component {
  componentWillMount() {
    this.props.logout()
    browserHistory.replace('/')
  }

  render() {
    return null
  }
}

Logout.propTypes = {
  router: PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Logout))
