import React, { Component } from 'react'
import { HeaderSortButton } from 'components/HeaderSortButton'
import Button from 'components/Button'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {
  hasData,
  isSuccess,
  isLoading,
  isUpdating,
  isError,
} from './store/constants'

const MISSING = 'MISSING'

class SalesTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredCompanies: [],
      users: {},
      showAddNew: false,
      newCompanyName: '',
    }
  }

  componentDidMount() {
    if (!hasData(this.props.companies)) {
      this.props.loadCompanies()
    } else {
      this.filterResult(this.props.companies.data, this.props.filter)
    }
    if (!hasData(this.props.statuses)) {
      this.props.loadStatuses()
    }
    if (!Object.keys(this.props.users).length) {
      this.props.getUsers()
    }
    document.title = 'STUDS | Alla företag'
  }

  componentWillReceiveProps(newProps) {
    this.checkForErrors(this.props, newProps)
    if (isLoading(this.props.companies) && isSuccess(newProps.companies)) {
      // initial load, sort by status
      this.filterResult(newProps.companies.data, newProps.filter)
    }
    if (
      hasData(this.props.companies) &&
      hasData(newProps.companies) &&
      Object.keys(this.props.companies.data).length !==
        Object.keys(newProps.companies.data).length
    ) {
      // new company added, remove filters
      this.setState(
        {
          showAddNew: false,
          newCompanyName: '',
        },
        () => {
          this.props.updateFilter({ text: '', user: 'Alla', status: 'Alla' })
          this.filterResult(newProps.companies.data, newProps.filter)
        }
      )
    }
    if (this.props.filter !== newProps.filter) {
      // update filters
      this.filterResult(newProps.companies.data, newProps.filter)
    }

    if (this.props.sorting !== newProps.sorting) {
      this.applySortStatus(newProps.companies.data, newProps.sorting)
    }
  }

  checkForErrors = (props, newProps) => {
    const reduxVariables = ['companies', 'statuses']
    reduxVariables.forEach(v => {
      if (!isError(props[v]) && isError(newProps[v])) {
        alert(
          'There was an error when ' + newProps[v].error + '\nPlease try again'
        )
      }
    })
  }

  filterResult = (companies, filter) => {
    this.setState(
      {
        filteredCompanies: Object.keys(companies)
          .filter(companyId =>
            companies[companyId].name
              .toLowerCase()
              .includes(filter.text.toLowerCase())
          )
          .filter(companyId =>
            filter.status === 'Alla'
              ? true
              : companies[companyId].status &&
                companies[companyId].status.id === filter.status
          )
          .filter(companyId =>
            filter.user === 'Alla'
              ? true
              : (companies[companyId].responsibleUser &&
                  companies[companyId].responsibleUser.id === filter.user) ||
                (!companies[companyId].responsibleUser &&
                  filter.user === MISSING)
          ),
      },
      () => this.applySortStatus(companies, this.props.sorting)
    )
  }

  setSortStatus = newProperty => {
    const { property, ascending } = this.props.sorting
    if (property === newProperty) {
      this.props.updateSorting({
        property,
        ascending: !ascending,
      })
    } else {
      this.props.updateSorting({
        property: newProperty,
        ascending: false,
      })
    }
  }

  applySortStatus = (companies, sorting) => {
    const { property, ascending } = sorting
    switch (property) {
      case 'name':
        this.sortByStringProperty(
          companyId => companies[companyId].name.toLowerCase(),
          companyId => companies[companyId].name.toLowerCase(),
          ascending
        )
        break
      case 'responsibleUser':
        this.sortByStringProperty(
          companyId => {
            return companies[companyId].responsibleUser
              ? this.props.users[
                  companies[companyId].responsibleUser.id
                ].toLowerCase()
              : null
          },
          companyId => companies[companyId].name.toLowerCase(),
          ascending
        )
        break
      case 'status':
        hasData(this.props.statuses) &&
          this.sortByStringProperty(
            companyId =>
              companies[companyId].status
                ? this.props.statuses.data[companies[companyId].status.id]
                    .priority
                : null,
            companyId => companies[companyId].name.toLowerCase(),
            !ascending
          )
        break
      default:
        throw new RangeError('Wrong sort property')
    }
  }

  sortByStringProperty = (getProperty, getSecondary, ascending) => {
    const sortedList = this.state.filteredCompanies.sort((a, b) => {
      let x = getProperty(a)
      let y = getProperty(b)
      if (x === null && y === null) {
        x = getSecondary(a)
        y = getSecondary(b)
      }
      if (x > y || (x === null && y !== null)) return ascending ? 1 : -1
      if (y > x || (y === null && x !== null)) return ascending ? -1 : 1
      return 0
    })
    this.setState({ filteredCompanies: sortedList })
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.filter}>
          <div className={styles.filter_input}>
            <label>Företag</label>
            <input
              type='text'
              autoFocus
              value={this.props.filter.text}
              onChange={event => {
                this.props.updateFilter({ text: event.target.value })
              }}
            />
          </div>
          <div className={styles.filter_input}>
            <label>Status</label>
            <select
              id='status-select'
              value={this.props.filter.status}
              onChange={event =>
                this.props.updateFilter({ status: event.target.value })
              }
            >
              <option value={'Alla'}>Alla</option>
              {Object.keys(this.props.statuses.data).map(key => (
                <option key={key} value={key}>
                  {this.props.statuses.data[key].name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filter_input}>
            <label>Ansvarig</label>
            <select
              id='member-select'
              value={this.props.filter.user}
              onChange={event =>
                this.props.updateFilter({ user: event.target.value })
              }
            >
              <option value={'Alla'}>Alla</option>
              <option value={MISSING}>{'Ingen ansvarig'}</option>
              {Object.keys(this.props.users).map(key => (
                <option key={key} value={key}>
                  {this.props.users[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.number_of_companies}>
          {isLoading(this.props.companies) ||
          isUpdating(this.props.companies) ? (
            <div>Laddar...</div>
          ) : (
            <div>
              Visar <b>{this.state.filteredCompanies.length}</b> företag{' '}
            </div>
          )}
        </div>
        <div className={styles.body}>
          <table className={styles.table}>
            <thead className={styles.table_head}>
              <tr>
                <HeaderSortButton
                  text='Företag'
                  attribute='name'
                  setSortStatus={this.setSortStatus}
                  sortStatus={this.props.sorting}
                />
                <HeaderSortButton
                  text='Status'
                  attribute='status'
                  setSortStatus={this.setSortStatus}
                  sortStatus={this.props.sorting}
                />
                <HeaderSortButton
                  text='Ansvarig'
                  attribute='responsibleUser'
                  setSortStatus={this.setSortStatus}
                  sortStatus={this.props.sorting}
                />
              </tr>
            </thead>
            <tbody>
              {hasData(this.props.companies) &&
                hasData(this.props.statuses) &&
                hasData(this.props.statuses) &&
                this.state.filteredCompanies.map(companyId =>
                  this.renderCompany(companyId)
                )}
            </tbody>
          </table>
        </div>
        {!this.state.showAddNew ? (
          <Button onClick={() => this.setState({ showAddNew: true })}>
            Lägg till ny
          </Button>
        ) : (
          this.renderAddNewInput()
        )}
        <div />
      </div>
    )
  }

  renderCompany(id) {
    const { name, status, responsibleUser } = this.props.companies.data[id]
    const statusName = status
      ? this.props.statuses.data[status.id].name
      : 'Saknar status'
    const statusColor = status
      ? this.props.statuses.data[status.id].color
      : 'inherit'
    const responsibleUserName = responsibleUser
      ? this.props.users[responsibleUser.id]
      : 'Ingen ansvarig'
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
        <td>
          <div
            style={{
              background: statusColor,
            }}
          >
            {statusName}
          </div>
        </td>
        <td>{responsibleUserName}</td>
      </tr>
    )
  }
  renderAddNewInput = () => {
    return (
      <div className={styles.add_new_container}>
        <div className={styles.add_new_text_input}>
          <label>Namn på det nya företaget</label>
          <input
            type='text'
            autoFocus
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
          <Button
            onClick={() => this.props.addCompany(this.state.newCompanyName)}
          >
            Lägg till
          </Button>
        </div>
      </div>
    )
  }
}

SalesTool.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  statuses: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  updateSorting: PropTypes.func.isRequired,
  loadStatuses: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  addCompany: PropTypes.func.isRequired,
}

export default SalesTool
