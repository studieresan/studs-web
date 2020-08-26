import React, { Component } from 'react'
import MultiSelect from '@khanacademy/react-multi-select'
import { HeaderSortButton } from 'components/HeaderSortButton'
import { YearPicker } from 'components/YearPicker'
import Button from 'components/Button'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {
  hasData,
  isSuccess,
  isLoading,
  isUpdating,
  isError,
} from 'store/salesTool/constants'

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
      this.props.getUsers(this.props.selectedYear)
    }
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
          this.props.updateFilter({ text: '', user: [], status: [] })
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

    if (newProps.selectedYear !== this.props.selectedYear) {
      this.props.getUsers(newProps.selectedYear)
      this.props.loadCompanies()
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
          .filter(companyId => {
            let companyStatus = undefined
            if (
              companies[companyId].years &&
              companies[companyId].years[this.props.selectedYear]
            ) {
              companyStatus =
                companies[companyId].years[this.props.selectedYear].status
            }
            return !filter.status.length
              ? true
              : companyStatus && filter.status.includes(companyStatus.id)
          })
          .filter(companyId => {
            let companyResponsible = undefined
            if (
              companies[companyId].years &&
              companies[companyId].years[this.props.selectedYear]
            ) {
              companyResponsible =
                companies[companyId].years[this.props.selectedYear]
                  .responsibleUser
            }
            return !filter.user.length
              ? true
              : (companyResponsible &&
                  filter.user.includes(companyResponsible.id)) ||
                  (!companyResponsible && filter.user.includes(MISSING))
          }),
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

  addCompany = name => {
    if (name.trim()) {
      const alreadyExists = Object.keys(this.props.companies.data).filter(
        k => this.props.companies.data[k].name === name
      ).length
      if (
        !alreadyExists ||
        confirm(
          'There already exists a company with this name.\n' +
            'Do you want to add another?'
        )
      ) {
        this.props.addCompany(name.trim())
      }
    } else {
      alert('Why are you adding a company without a name? Stop it!')
    }
  }

  getSalesAmountForFilteredCompanies = () => {
    return this.state.filteredCompanies
      .reduce((acc, currentId) => {
        const year = this.props.companies.data[currentId].years[
          this.props.selectedYear
        ]
        return year ? acc + year.amount : acc
      }, 0)
      .toLocaleString('sv')
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.sales_tool_title}>
          <h1>Sales tool</h1>
          <YearPicker
            selectedYear={this.props.selectedYear}
            setStudsYear={year => this.props.setStudsYear(year)}
          />
        </div>
        <div className={styles.top_buttons}>
          <Button
            onClick={() => {
              this.props.history.push({ pathname: '/empty' })
              this.props.history.replace({
                pathname: 'sales-tool/contact-requests',
              })
            }}
          >
            Kontaktförfrågningar
          </Button>
        </div>
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
            <MultiSelect
              options={Object.keys(this.props.statuses.data).map(value => ({
                value,
                label: this.props.statuses.data[value].name,
              }))}
              selected={this.props.filter.status}
              onSelectedChanged={selected => {
                this.props.updateFilter({ status: selected })
              }}
            />
          </div>
          <div className={styles.filter_input}>
            <label>Ansvarig</label>
            <MultiSelect
              options={[{ value: MISSING, label: 'Ingen ansvarig' }].concat(
                Object.keys(this.props.users).map(value => ({
                  value,
                  label: this.props.users[value],
                }))
              )}
              selected={this.props.filter.user}
              onSelectedChanged={selected => {
                this.props.updateFilter({ user: selected })
              }}
            />
          </div>
        </div>
        <div className={styles.number_of_companies}>
          {isLoading(this.props.companies) ||
          isUpdating(this.props.companies) ? (
            <div>Laddar...</div>
          ) : (
            <div>
              Visar <b>{this.state.filteredCompanies.length}</b> företag med
              inkomster på <b>{this.getSalesAmountForFilteredCompanies()}</b>{' '}
              SEK
            </div>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.company_list}>
            <div className={styles.list_header}>
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
            </div>
            {hasData(this.props.companies) &&
              hasData(this.props.statuses) &&
              hasData(this.props.statuses) &&
              this.state.filteredCompanies.map(companyId =>
                this.renderCompany(companyId)
              )}
          </div>
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
    const { name, years } = this.props.companies.data[id]
    let status,
      responsibleUser = undefined
    if (years[this.props.selectedYear]) {
      status = years[this.props.selectedYear].status
      responsibleUser = years[this.props.selectedYear].responsibleUser
    }
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
      <div key={id} className={styles.list_item}>
        <div
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
        </div>
        <div>
          <div
            style={{
              background: statusColor,
            }}
          >
            {statusName}
          </div>
        </div>
        <div>{responsibleUserName}</div>
      </div>
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
          <Button onClick={() => this.addCompany(this.state.newCompanyName)}>
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
  selectedYear: PropTypes.number.isRequired,
  setStudsYear: PropTypes.func.isRequired,
}

export default SalesTool
