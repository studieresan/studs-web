import React, { Component } from 'react'
//import { companiesApi, addCompanyApi } from '../utils/api'
import { HeaderSortButton } from 'components/HeaderSortButton'
//import CompanyDetails from './CompanyDetails'
import PropTypes from 'prop-types'

class Companies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderCompanyDetails: false,
      companies: [],
      filteredCompanies: [],
      users: { 1: 'Cristian Osorio Bretti' },
      statuses: { 1: 'Kontaktad' },
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
    //this.getCompanies()
    document.title = 'STUDS | Alla företag'
  }

  //   getCompanies = async () => {
  //     try {
  //       const companies = await companiesApi()
  //       this.setState({ companies }, this.filterResult)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

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
            this.state.filterStatus === 'Alla'
              ? 1
              : company.status === this.state.filterStatus
          )
          .filter(company =>
            this.state.filterUser === 'Alla'
              ? 1
              : company.user_id === this.state.filterUser
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
    // if (this.state.renderCompanyDetails) {
    //   return (
    //     <CompanyDetails
    //       {...this.props}
    //       back={() => {
    //         this.props.history.push({ pathname: '/empty' })
    //         this.props.history.replace({ pathname: '/companies' })
    //         this.setState({ renderCompanyDetails: false })
    //         this.getCompanies() //TODO: This should be replaced with something more efficient
    //       }}
    //     />
    //   )
    // }
    return (
      <div className='text-center m-w-full m-h-full flex flex-col items-center justify-center'>
        <div className='bg-gray-700 w-100 text-5xl pt-4 pb-4 text-white'>
          Företag
        </div>
        <div className='bg-white flex-1 w-100 flex flex-col items-center'>
          <div className='body flex justify-center'>
            <div className='form-group mr-2'>
              <label>Företag</label>
              <input
                type='text'
                className='form-control'
                value={this.state.filterText}
                onChange={event => {
                  this.setState(
                    { filterText: event.target.value },
                    this.filterResult
                  )
                }}
              />
            </div>
            <div className='mr-2'>
              <label>Status</label>
              <select
                className='form-control'
                id='status-select'
                value={this.state.filterStatus}
                onChange={event =>
                  this.setState(
                    { filterStatus: event.target.value },
                    this.filterResult
                  )
                }
              >
                <option value='Alla'>Alla</option>
                {Object.keys(this.state.statuses).map(key => (
                  <option key={key} value={key}>
                    {this.state.statuses[key]}
                  </option>
                ))}
              </select>
            </div>
            <div className='mr-2'>
              <label>Ansvarig</label>
              <select
                className='form-control'
                id='member-select'
                value={this.state.filterUser}
                onChange={event =>
                  this.setState(
                    { filterUser: event.target.value },
                    this.filterResult
                  )
                }
              >
                <option value='Alla'>Alla</option>
                {Object.keys(this.state.users).map(key => (
                  <option key={key} value={key}>
                    {this.state.users[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            Visar <b>{this.state.filteredCompanies.length}</b> företag
          </div>
          {!this.state.showAddNew && (
            <button
              className='btn-sm md:btn-md btn-primary'
              onClick={() => this.setState({ showAddNew: true })}
            >
              Lägg till ny
            </button>
          )}

          {this.state.showAddNew && this.renderAddNewInput()}

          <div className='body mt-2'>
            <table className='table table-striped'>
              <thead className='thead-dark'>
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
      </div>
    )
  }

  renderCompany({ id, name, status, userId }) {
    const statusName = this.props.statuses[status]
    return (
      <tr key={id}>
        <td
          className='cursor-pointer hover:font-bold hover:underline'
          onClick={() => {
            this.props.history.push({ pathname: '/empty' })
            this.props.history.replace({ pathname: `/companies/${id}` })
            this.setState({ renderCompanyDetails: true })
          }}
        >
          {name}
        </td>
        <td className={`status-box status-color-${status}`}>{statusName}</td>
        <td>{this.props.users[userId]}</td>
      </tr>
    )
  }
  renderAddNewInput = () => {
    return (
      <div className='body flex flex-column justify-center items-center mb-4'>
        <div className='mb-2 w-2/5'>
          <label>Företag</label>
          <input
            type='text'
            className='form-control'
            id='newCompanyInput'
            value={this.state.newCompanyName}
            onChange={event =>
              this.setState({ newCompanyName: event.target.value })
            }
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='btn-sm md:btn-md btn-secondary'
            onClick={() => this.setState({ showAddNew: false })}
          >
            Avbryt
          </button>
          <button
            className='btn-sm md:btn-md btn-primary whitespace-no-wrap'
            onClick={() => this.addNewCompany()}
          >
            Lägg till
          </button>
        </div>
      </div>
    )
  }
}

Companies.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
}

export default Companies
