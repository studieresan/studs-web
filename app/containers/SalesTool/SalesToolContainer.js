import SalesTool from './SalesTool'
import { connect } from 'react-redux'
import {
  loadCompanies,
  addCompany,
  updateCompany,
} from 'store/salesTool/companies/actions'
import { loadStatuses } from 'store/salesTool/statuses/actions'

import {
  loadContacts,
  updateContact,
  deleteContact,
  addContact,
} from 'store/salesTool/contacts/actions'

import {
  loadComments,
  addComment,
  deleteComment,
  updateComment,
} from 'store/salesTool/comments/actions'

import { getUsers } from '../Members/actions'

import { updateFilter, updateSorting } from 'store/salesTool/actions'

const mapStateToProps = rootState => {
  const currentUser = rootState.getIn(['global', 'user']).toJS()
  const companies = rootState.getIn(['salesTool', 'companies'])
  const contacts = rootState.getIn(['salesTool', 'contacts'])
  const comments = rootState.getIn(['salesTool', 'comments'])
  const statuses = rootState.getIn(['salesTool', 'statuses'])
  const filter = rootState.getIn(['salesTool', 'filter'])
  const sorting = rootState.getIn(['salesTool', 'sorting'])
  const users = rootState.getIn(['members', 'users']).toJS()

  const userMap = {}
  users
    .filter(u => u.userRole === 'sales_group')
    .forEach(u => (userMap[u.realId] = u.firstName + ' ' + u.lastName))
  return {
    companies,
    currentUser,
    contacts,
    comments,
    statuses,
    filter,
    sorting,
    users: userMap,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    updateFilter: newFilter => dispatch(updateFilter(newFilter)),
    updateSorting: newSorting => dispatch(updateSorting(newSorting)),
    loadStatuses: () => dispatch(loadStatuses()),
    loadCompanies: () => dispatch(loadCompanies()),
    addCompany: name => dispatch(addCompany(name)),
    updateCompany: (id, body) => dispatch(updateCompany(id, body)),
    updateContact: (id, body) => dispatch(updateContact(id, body)),
    deleteContact: (contactId, companyId) =>
      dispatch(deleteContact(contactId, companyId)),
    addContact: (body, companyId) => dispatch(addContact(body, companyId)),
    loadContacts: companyId => dispatch(loadContacts(companyId)),
    loadComments: companyId => dispatch(loadComments(companyId)),
    addComment: (text, companyId) => dispatch(addComment(text, companyId)),
    deleteComment: (commentId, companyId) =>
      dispatch(deleteComment(commentId, companyId)),
    updateComment: (id, text) => dispatch(updateComment(id, text)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesTool)
