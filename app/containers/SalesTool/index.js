import React, { Component } from 'react'
//import { companiesApi, addCompanyApi } from '../utils/api'
import { HeaderSortButton } from 'components/HeaderSortButton'
import Button from 'components/Button'
import SalesToolCompanyDetails from '../SalesToolCompanyDetails'
import PropTypes from 'prop-types'
import { fetchCompanies, fetchStudsUserNames } from 'api'
import styles from './styles.css'

class SalesTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderCompanyDetails: false,
      companies: [
        { id: 1, name: 'Company 1', status: 1, userId: 1 },
        { id: 2, name: 'Company 2', status: 1, userId: 1 },
        { id: 3, name: 'Company 3', status: 2, userId: 1 },
      ],
      filteredCompanies: [],
      users: { 1: 'Cristian Osorio Bretti', 2: 'Pelle' },
      statuses: { 1: 'Ej kontaktad', 2: 'Kontaktad' },
      showAddNew: false,
      newCompanyName: '',
      filterText: '',
      filterUser: 0,
      filterStatus: 0,
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
    this.filterResult()
    this.getCompanies()
    this.getStudsUsers()
    document.title = 'STUDS | Alla företag'
  }

  async getCompanies() {
    try {
      const companies = await fetchCompanies()
      // this.setState({ companies }, this.filterResult)
      console.log(companies)
    } catch (e) {
      console.error(e)
    }
  }

  async getStudsUsers() {
    try {
      const users = await fetchStudsUserNames()
      console.log(users)
      this.setState({ users })
    } catch (e) {
      console.error(e)
    }
  }

  //   addNewCompany = async () => {
  //     try {
  //       const wasAdded = await addCompanyApi({ name: this.state.newCompanyName })
  //       if (wasAdded) {
  //         this.setState({ showAddNew: false, newCompanyName: '' })
  //         this.getCompanies()
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

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
            this.state.filterStatus === 0
              ? 1
              : company.status === this.state.filterStatus
          )
          .filter(company =>
            this.state.filterUser === 0
              ? 1
              : company.userId === this.state.filterUser
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
        this.sortByStringProperty(property, direction)
        break
      case 'user_id':
        this.sortByStringProperty(property, direction)
        break
      case 'status':
        this.sortByStatus(direction)
        break
      default:
        throw new RangeError('Wrong sort property')
    }
  }

  sortByStringProperty = (property, direction) => {
    let sortedList = []
    if (direction === 'ASC') {
      sortedList = this.state.filteredCompanies.sort(
        (a, b) =>
          (a[property] === null) - (b[property] === null) ||
          +(a[property] > b[property]) ||
          -(a[property] < b[property])
      )
    } else {
      sortedList = this.state.filteredCompanies.sort(
        (a, b) =>
          (a[property] === null) - (b[property] === null) ||
          -(a[property] > b[property]) ||
          +(a[property] < b[property])
      )
    }
    this.setState({ filteredCompanies: sortedList })
  }

  sortByStatus = direction => {
    let sortedList = []
    if (direction === 'ASC') {
      sortedList = this.state.filteredCompanies.sort((a, b) => {
        if (a.status > b.status) {
          return 1
        } else if (a.status < b.status) {
          return -1
        } else {
          return 0
        }
      })
    } else {
      sortedList = this.state.filteredCompanies.sort((a, b) => {
        if (a.status > b.status) {
          return -1
        } else if (a.status < b.status) {
          return 1
        } else {
          return 0
        }
      })
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
                  { filterStatus: parseInt(event.target.value) },
                  this.filterResult
                )
              }
            >
              <option value={0}>Alla</option>
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
                  { filterUser: parseInt(event.target.value) },
                  this.filterResult
                )
              }
            >
              <option value={0}>Alla</option>
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
                  attribute='user_id'
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

  renderCompany({ id, name, status, userId }) {
    const statusName = this.state.statuses[status]
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
        <td>{this.state.users[userId]}</td>
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
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
}

export default SalesTool
