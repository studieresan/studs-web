import SalesTool from './SalesTool'
import { connect } from 'react-redux'
import { loadCompanies, addCompany } from 'store/salesTool/companies/actions'

import { getUsers } from '../Members/actions'

import {
  updateFilter,
  updateSorting,
  setStudsYear,
} from 'store/salesTool/actions'

const mapStateToProps = rootState => {
  const currentUser = rootState.getIn(['global', 'user']).toJS()
  const companies = rootState.getIn(['salesTool', 'companies'])
  const contacts = rootState.getIn(['salesTool', 'contacts'])
  const comments = rootState.getIn(['salesTool', 'comments'])
  const filter = rootState.getIn(['salesTool', 'filter'])
  const sorting = rootState.getIn(['salesTool', 'sorting'])
  const year = rootState.getIn(['salesTool', 'year'])
  const users = rootState.getIn(['members', 'users']).toJS()

  const userMap = {}
  users
    .filter(u => u.userRole === 'sales_group')
    .forEach(u => (userMap[u.realId] = u.firstName + ' ' + u.lastName))

  //get unique statuses, it was late in the night...
  const statuses = [
    ...new Set(
      Object.keys(companies.data)
        .flatMap(keys => companies.data[keys].statuses)
        .map(status => status.statusDescription)
    ),
  ]
  return {
    companies,
    currentUser,
    contacts,
    comments,
    statuses,
    filter,
    sorting,
    selectedYear: year,
    users: userMap,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: year => dispatch(getUsers(year)),
    updateFilter: newFilter => dispatch(updateFilter(newFilter)),
    updateSorting: newSorting => dispatch(updateSorting(newSorting)),
    loadCompanies: () => dispatch(loadCompanies()),
    addCompany: name => dispatch(addCompany(name)),
    setStudsYear: year => dispatch(setStudsYear(year)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesTool)
