import React, { Component } from 'react'

import BackHeader from 'components/BackHeader'

import styles from './styles.css'
import PropTypes from 'prop-types'

import { isSuccess, hasData } from 'store/salesTool/constants'

class SalesOverview extends Component {
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
    const soldAmountMember = []
    let totalAmount = 0
    const widthOfBar = (1 / Object.keys(users).length) * 100

    Object.keys(users).forEach(userId => {
      soldAmountMember.push({ userId, name: users[userId], amount: 0 })
    })

    Object.keys(companies.data).forEach(companyId => {
      const companyObject = companies.data[companyId]
      const responsibleUserId = companyObject.responsibleUser.id
      soldAmountMember.find(obj => obj.userId === responsibleUserId).amount +=
        companyObject.amount
      totalAmount += companyObject.amount
    })

    return (
      <div className={styles.bar_chart_container}>
        {soldAmountMember
          .filter(data => data.amount)
          .sort((a, b) => b.amount - a.amount)
          .map(data =>
            this.renderBar({
              totalAmount,
              widthOfBar,
              ...data,
            })
          )}
      </div>
    )
  }

  renderBar = ({ totalAmount, widthOfBar, userId, amount, name }) => {
    const heightInProcent = (amount / totalAmount) * 100 + '%'
    return (
      <div
        key={userId}
        className={styles.bar_container}
        style={{ width: widthOfBar + '%' }}
      >
        <div className={styles.bar_amount}> {amount} </div>
        <div className={styles.bar} style={{ height: heightInProcent }} />
        <div className={styles.bar_name}> {name.split(' ')[0]} </div>
      </div>
    )
  }
}

SalesOverview.propTypes = {
  history: PropTypes.object.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
}

export default SalesOverview
