import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory, withRouter } from 'react-router'

class Logout extends Component {
  componentWillMount() {
    localStorage.token = null
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

export default connect()(withRouter(Logout))
