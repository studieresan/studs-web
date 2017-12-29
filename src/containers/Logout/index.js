import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

import { logout } from '../App/actions'

class Logout extends Component {
  componentWillMount() {
    this.props.logout()
    this.props.goHome()
  }

  render() {
    return null
  }
}

Logout.propTypes = {
  router: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    goHome: () => dispatch(push('/')),
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Logout))
