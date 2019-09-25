import React, { Component } from 'react'
import { HeaderSortButton } from 'components/HeaderSortButton'
import Button from 'components/Button'
import CompanyDetails from './CompanyDetails'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { hasData, isSuccess, isLoading, isUpdating } from './store/constants'

const MISSING = 'MISSING'

class SalesTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyDetailsId: null,
      filteredCompanies: [],
      users: {},
      showAddNew: false,
      newCompanyName: '',
      sortStatus: {
        property: 'status',
        direction: 'DESC',
      },
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ companyDetailsId: this.props.match.params.id })
    }
    this.props.loadCompanies()
    this.props.loadStatuses()
    this.props.getUsers()

    document.title = 'STUDS | Alla företag'
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.id !== this.state.companyDetailsId) {
      this.setState({ companyDetailsId: newProps.match.params.id })
    }
    if (isLoading(this.props.companies) && isSuccess(newProps.companies)) {
      this.filterResult(newProps.companies.data, newProps.filter)
    }
    if (
      hasData(this.props.companies) &&
      hasData(newProps.companies) &&
      Object.keys(this.props.companies.data).length !==
        Object.keys(newProps.companies.data).length
    ) {
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
      this.filterResult(newProps.companies.data, newProps.filter)
    }
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
              : (companies[companyId].status &&
                  companies[companyId].status.id === filter.status) ||
                (!companies[companyId].status && filter.status === MISSING)
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
      () => this.applySortStatus(companies)
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

  applySortStatus = (companies = this.props.companies.data) => {
    const { property, direction } = this.state.sortStatus
    switch (property) {
      case 'name':
        this.sortByStringProperty(
          companyId => companies[companyId].name.toLowerCase(),
          direction
        )
        break
      case 'responsibleUser':
        this.sortByStringProperty(companyId => {
          return companies[companyId].responsibleUser
            ? this.props.users[companies[companyId].responsibleUser.id]
            : null
        }, direction)
        break
      case 'status':
        this.sortByStringProperty(
          companyId =>
            companies[companyId].status
              ? this.props.statuses.data[companies[companyId].status.id]
              : null,
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

  render() {
    if (this.state.companyDetailsId) {
      return hasData(this.props.companies) ? (
        <CompanyDetails
          company={this.props.companies.data[this.state.companyDetailsId]}
          currentUser={this.props.currentUser}
          updateCompany={this.props.updateCompany}
          contacts={this.props.contacts}
          loadContacts={this.props.loadContacts}
          updateContact={this.props.updateContact}
          deleteContact={this.props.deleteContact}
          addContact={this.props.addContact}
          loadComments={this.props.loadComments}
          comments={this.props.comments}
          addComment={this.props.addComment}
          deleteComment={this.props.deleteComment}
          updateComment={this.props.updateComment}
          users={this.props.users}
          statuses={this.props.statuses.data}
          back={() => {
            this.props.history.push({ pathname: '/sales-tool/companies' })
          }}
        />
      ) : (
        <div className={styles.content}>Laddar</div>
      )
    }
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
              <option value={MISSING}>{'Saknar status'}</option>
              {Object.keys(this.props.statuses.data).map(key => (
                <option key={key} value={key}>
                  {this.props.statuses.data[key]}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filter_input}>
            <label>Ansvarig</label>
            <select
              id='member-select'
              value={this.props.filter.User}
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
              {this.state.filteredCompanies.map(companyId =>
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
      ? this.props.statuses.data[status.id]
      : 'Saknar status'
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
        <td>{statusName}</td>
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
  currentUser: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  loadStatuses: PropTypes.func.isRequired,
  statuses: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  companies: PropTypes.object.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired,
  addCompany: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
  loadContacts: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired,
  loadComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
}

export default SalesTool
