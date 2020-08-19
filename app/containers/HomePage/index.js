import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../Members/actions'

import { HomePageContent } from 'components/HomePage'

import Footer from 'components/HomeFooter'

export class HomePage extends Component {
  render() {
    return (
      <div>
        <HomePageContent />
        <Footer />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapDispatchToProps)(HomePage)
