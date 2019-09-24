import React, { Component } from 'react'
//import { companiesApi, addCompanyApi } from '../utils/api'
import { HeaderSortButton } from 'components/HeaderSortButton'
import Button from 'components/Button'
import SalesToolCompanyDetails from '../SalesToolCompanyDetails'
import PropTypes from 'prop-types'
import { fetchCompanies, fetchStudsUserNames, fetchSaleStatuses } from 'api'
import styles from './styles.css'

const MISSING = 'MISSING'

class SalesTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderCompanyDetails: false,
      companies: [],
      filteredCompanies: [],
      users: {},
      statuses: {},
      showAddNew: false,
      newCompanyName: '',
      filterText: '',
      filterUser: 'Alla',
      filterStatus: 'Alla',
      sortStatus: {
        property: 'status',
        direction: 'DESC',
      },
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ renderCompanyDetails: true })
    }
    Promise.all([
      this.getCompanies(),
      this.getStudsUsers(),
      this.getSaleStatuses(),
    ]).then(this.filterResult)
    document.title = 'STUDS | Alla företag'
  }

  getCompanies = () =>
    fetchCompanies().then(companies => this.setState({ companies }))

  getStudsUsers = () =>
    fetchStudsUserNames()
      .then(studsUsers => {
        const usersMap = {}
        studsUsers.forEach(
          u => (usersMap[u.id] = u.profile.firstName + ' ' + u.profile.lastName)
        )
        return usersMap
      })
      .then(users => this.setState({ users }))

  getSaleStatuses = () =>
    fetchSaleStatuses()
      .then(allCompanySalesStatuses => {
        const statusMap = {}
        allCompanySalesStatuses.forEach(s => (statusMap[s.id] = s.name))
        return statusMap
      })
      .then(statuses => this.setState({ statuses }))

  // addNewCompany() {
  //   try {
  //     return addCompanyApi({ name: this.state.newCompanyName })
  //     if (wasAdded) {
  //       this.setState({ showAddNew: false, newCompanyName: '' })
  //       this.getCompanies()
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  filterResult = () => {
    this.setState(
      {
        filteredCompanies: this.state.companies
          .filter(company =>
            company.name
              .toLowerCase()
              .includes(this.state.filterText.toLowerCase())
          )
          .filter(company =>
            this.state.filterStatus === 'Alla'
              ? true
              : (company.status &&
                  company.status.id === this.state.filterStatus) ||
                (!company.status && this.state.filterStatus === MISSING)
          )
          .filter(company =>
            this.state.filterUser === 'Alla'
              ? true
              : (company.responsibleUser &&
                  company.responsibleUser.id === this.state.filterUser) ||
                (!company.responsibleUser && this.state.filterUser === MISSING)
          ),
      },
      this.applySortStatus
    )
  }

  setSortStatus = property => {
    if (this.state.sortStatus.property === property) {
      switch (this.state.sortStatus.direction) {
        case 'ASC':
          this.setState(
            { sortStatus: { property, direction: 'DESC' } },
            this.applySortStatus
          )
          break
        case 'DESC':
          this.setState(
            { sortStatus: { property, direction: 'ASC' } },
            this.applySortStatus
          )
          break
        default:
          throw new RangeError('Wrong sort status direction')
      }
    } else {
      this.setState(
        { sortStatus: { property, direction: 'ASC' } },
        this.applySortStatus
      )
    }
  }

  applySortStatus = () => {
    const { property, direction } = this.state.sortStatus
    switch (property) {
      case 'name':
        this.sortByStringProperty(company => company.name, direction)
        break
      case 'responsibleUser':
        this.sortByStringProperty(company => {
          return company.responsibleUser
            ? this.state.users[company.responsibleUser.id]
            : null
        }, direction)
        break
      case 'status':
        this.sortByStringProperty(
          company =>
            company.status ? this.state.statuses[company.status.id] : null,
          direction
        )
        break
      default:
        throw new RangeError('Wrong sort property')
    }
  }

  sortByStringProperty = (getProperty, direction) => {
    let sortedList = []
    if (direction === 'ASC') {
      sortedList = this.state.filteredCompanies.sort(
        (a, b) =>
          (getProperty(a) === null) - (getProperty(b) === null) ||
          +(getProperty(a) > getProperty(b)) ||
          -(getProperty(a) < getProperty(b))
      )
    } else {
      sortedList = this.state.filteredCompanies.sort(
        (a, b) =>
          (getProperty(b) === null) - (getProperty(a) === null) ||
          -(getProperty(a) > getProperty(b)) ||
          +(getProperty(a) < getProperty(b))
      )
    }
    this.setState({ filteredCompanies: sortedList })
  }

  getStatusIdByStatusName = name => {
    return this.state.statuses.find(s => s.status === name).id
  }

  render() {
    if (this.state.renderCompanyDetails) {
      return (
        <SalesToolCompanyDetails
          {...this.props}
          back={() => {
            this.props.history.push({ pathname: '/empty' })
            this.props.history.replace({ pathname: '/companies' })
            this.setState({ renderCompanyDetails: false })
            this.getCompanies() //TODO: This should be replaced with something more efficient
          }}
        />
      )
    }
    return (
      <div className={styles.content}>
        {/* 'bg-white flex-1 w-100 flex flex-col items-center'> */}
        <div className={styles.filter}>
          <div className={styles.filter_input}>
            <label>Företag</label>
            <input
              type='text'
              value={this.state.filterText}
              onChange={event => {
                this.setState(
                  { filterText: event.target.value },
                  this.filterResult
                )
              }}
            />
          </div>
          <div className={styles.filter_input}>
            <label>Status</label>
            <select
              id='status-select'
              value={this.state.filterStatus}
              onChange={event =>
                this.setState(
                  { filterStatus: event.target.value },
                  this.filterResult
                )
              }
            >
              <option value={'Alla'}>Alla</option>
              <option value={MISSING}>{'Saknar status'}</option>
              {Object.keys(this.state.statuses).map(key => (
                <option key={key} value={key}>
                  {this.state.statuses[key]}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filter_input}>
            <label>Ansvarig</label>
            <select
              id='member-select'
              value={this.state.filterUser}
              onChange={event =>
                this.setState(
                  { filterUser: event.target.value },
                  this.filterResult
                )
              }
            >
              <option value={'Alla'}>Alla</option>
              <option value={MISSING}>{'Ingen ansvarig'}</option>
              {Object.keys(this.state.users).map(key => (
                <option key={key} value={key}>
                  {this.state.users[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.number_of_companies}>
          Visar <b>{this.state.filteredCompanies.length}</b> företag
        </div>
        {!this.state.showAddNew && (
          <Button onClick={() => this.setState({ showAddNew: true })}>
            Lägg till ny
          </Button>
        )}
        {this.state.showAddNew && this.renderAddNewInput()}
        <div className={styles.body}>
          <table className={styles.table}>
            <thead className={styles.table_head}>
              <tr>
                <HeaderSortButton
                  text='Företag'
                  attribute='name'
                  setSortStatus={this.setSortStatus}
                  sortStatus={this.state.sortStatus}
                />
                <HeaderSortButton
                  text='Status'
                  attribute='status'
                  setSortStatus={this.setSortStatus}
                  sortStatus={this.state.sortStatus}
                />
                <HeaderSortButton
                  text='Ansvarig'
                  attribute='responsibleUser'
                  setSortStatus={this.setSortStatus}
                  sortStatus={this.state.sortStatus}
                />
              </tr>
            </thead>
            <tbody>
              {this.state.filteredCompanies.map(company =>
                this.renderCompany(company)
              )}
            </tbody>
          </table>
        </div>
        <div />
      </div>
    )
  }

  renderCompany({ id, name, status, responsibleUser }) {
    const statusName = status ? this.state.statuses[status.id] : 'Saknar status'
    const responsibleUserName = responsibleUser
      ? this.state.users[responsibleUser.id]
      : '-'
    return (
      <tr key={id}>
        <td
          className={styles.company_link}
          onClick={() => {
            this.props.history.push({ pathname: '/empty' })
            this.props.history.replace({
              pathname: `sales-tool/companies/${id}`,
            })
            this.setState({ renderCompanyDetails: true })
          }}
        >
          {name}
        </td>
        <td>{statusName}</td>
        <td>{responsibleUserName}</td>
      </tr>
    )
  }
  renderAddNewInput = () => {
    return (
      <div className={styles.add_new_container}>
        <div className={styles.add_new_text_input}>
          <label>Företag</label>
          <input
            type='text'
            id='newCompanyInput'
            value={this.state.newCompanyName}
            onChange={event =>
              this.setState({ newCompanyName: event.target.value })
            }
          />
        </div>
        <div>
          <Button
            color='danger'
            onClick={() => this.setState({ showAddNew: false })}
          >
            Avbryt
          </Button>
          <Button onClick={() => this.addNewCompany()}>Lägg till</Button>
        </div>
      </div>
    )
  }
}

SalesTool.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default SalesTool
