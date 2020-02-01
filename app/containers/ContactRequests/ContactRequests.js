import React, { Component } from 'react'

import ContactRequestHeader from 'components/ContactRequestHeader'

import styles from './styles.css'
import PropTypes from 'prop-types'

import { isSuccess, hasData } from 'store/salesTool/constants'

class ContactRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (!isSuccess(this.props.contactRequests)) {
      this.props.loadContactRequests()
    }
  }

  componentWillReceiveProps(newProps) {}

  checkForErrors = (props, newProps) => {}

  timestampToDateString = timestamp => {
    return new Date(timestamp)
      .toISOString()
      .slice(0, 16)
      .replace('T', ' ')
  }

  render() {
    return (
      <div className={styles.content}>
        <ContactRequestHeader
          back={() =>
            this.props.history.push({ pathname: '/sales-tool/companies' })
          }
        />
        <div className={styles.contacts}>
          {!hasData(this.props.contactRequests) && 'Loading..'}
          {hasData(this.props.contactRequests) &&
            this.props.contactRequests.data
              .sort((a, b) => a.arrived - b.arrived)
              .map(contact => this.renderContactRequest(contact))}
        </div>
      </div>
    )
  }

  renderContactRequest = contact => (
    <div className={styles.contact_container} key={contact.id}>
      <div>{this.timestampToDateString(contact.arrived)}</div>
      <div className={styles.contact_email}>{contact.email}</div>
    </div>
  )
}

ContactRequest.propTypes = {
  history: PropTypes.object.isRequired,
  loadContactRequests: PropTypes.func.isRequired,
  contactRequests: PropTypes.object.isRequired,
}

export default ContactRequest
