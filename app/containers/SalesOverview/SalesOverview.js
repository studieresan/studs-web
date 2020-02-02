import React, { Component } from 'react'

import BackHeader from 'components/BackHeader'

import styles from './styles.css'
import PropTypes from 'prop-types'

import { isSuccess, hasData } from 'store/salesTool/constants'

class ContactRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    if (!isSuccess(this.props.companies)) {
      this.props.loadCompanies()
    }

    if (!this.hasFetchedUsers()) {
      this.props.getUsers()
    }
  }

  hasFetchedUsers = () => {
    return Object.keys(this.props.users).length
  }

  render() {
    const companies = this.props.companies
    const users = this.props.users
    return (
      <div className={styles.content}>
        <BackHeader
          title='Overview'
          back={() =>
            this.props.history.push({ pathname: '/sales-tool/companies' })
          }
        />
        {!hasData(companies) && !hasData(users) && 'waiting for one...'}

        {hasData(companies) &&
          this.hasFetchedUsers() &&
          this.renderOverview(companies, users)}
      </div>
    )
  }

  renderOverview = (companies, users) => {
    const objectToDisplay = {}
    let totalAmount = 0

    Object.keys(users).forEach(userId => {
      objectToDisplay[userId] = { name: users[userId], amount: 0 }
    })

    Object.keys(companies.data).forEach(companyId => {
      const companyObject = companies.data[companyId]
      const responsibleUserId = companyObject.responsibleUser.id
      objectToDisplay[responsibleUserId].amount += companyObject.amount
      totalAmount += companyObject.amount
    })

    return (
      <div className={styles.bar_chart_container}>
        {Object.keys(objectToDisplay).map(userId =>
          this.renderBar({ userId, totalAmount, ...objectToDisplay[userId] })
        )}
      </div>
    )
  }

  renderBar = ({ userId, totalAmount, amount, name }) => {
    const heightInProcent = (amount / totalAmount) * 100 + '%'
    return (
      <div key={userId} className={styles.bar_container}>
        <div> {amount} </div>
        <div className={styles.bar} style={{ height: heightInProcent }} />
        <div> {name} </div>
      </div>
    )
  }
}

ContactRequest.propTypes = {
  history: PropTypes.object.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
}

export default ContactRequest
