import React, { Component } from 'react'
import GroupComponent from '../../components/GroupComponent'
import Footer from '../../components/Footer'

export default class Group extends Component {
  render() {
    return (
      <div>
        <GroupComponent />
        <Footer hasBackground />
      </div>
    )
  }
}
