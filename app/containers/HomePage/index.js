import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Members/actions'

import { HomePageContent, HomePageAbout } from 'components/HomePage'

import Footer from 'components/Footer'

export class HomePage extends Component {
  render() {
    return (
      <div>
        <HomePageContent />
        <HomePageAbout />
        <Footer showCollaborators hasBackground={false} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapDispatchToProps)(HomePage)
