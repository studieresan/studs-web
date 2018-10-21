// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import styles from './styles.css'
import Navbar from 'containers/Navbar'
import ScrollContainer from 'containers/ScrollContainer'
import * as actions from './actions'

type Props = {|
  children: React.Node,
  loggedIn: boolean,
  getUser: () => any
|}

class App extends React.Component<Props, {}> {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.getUser()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      this.props.getUser()
    }
  }

  render() {
    return (
      <ScrollContainer>
        <div className={styles.container}>
          <Navbar />
          { this.props.children }
        </div>
      </ScrollContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']),
    fetchingUser: state.getIn(['global', 'fetchingUser']),
    loggedIn: state.getIn(['global', 'loggedIn'])
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
