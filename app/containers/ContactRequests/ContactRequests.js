import React, { Component } from 'react'

import ContactRequestHeader from 'components/ContactRequestHeader'

import styles from './styles.css'
import PropTypes from 'prop-types'

class ContactRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentWillReceiveProps(newProps) {}

  checkForErrors = (props, newProps) => {}

  timestampToDateString = timestamp => {
    return new Date(timestamp)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
  }

  render() {
    const contactsRequests = [
      { id: '1', email: 'person@företag.com', arrived: 1577875620000 },
      { id: '2', email: 'person2@företag2.com', arrived: 1580554020000 },
    ]
    return (
      <div className={styles.content}>
        <ContactRequestHeader
          back={() =>
            this.props.history.push({ pathname: '/sales-tool/companies' })
          }
        />
        <div className={styles.contacts}>
          {contactsRequests
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
}

export default ContactRequest
