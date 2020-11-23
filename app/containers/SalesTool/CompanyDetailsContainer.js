import CompanyDetails from './CompanyDetails'
import { connect } from 'react-redux'
import {
  updateCompany,
  loadCompanies,
  loadCompany,
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

import { setStudsYear } from 'store/salesTool/actions'

import { getUsers } from 'containers/Members/actions'

const mapStateToProps = rootState => {
  const currentUser = rootState.getIn(['global', 'user']).toJS()
  const companies = rootState.getIn(['salesTool', 'companies'])
  const contacts = rootState.getIn(['salesTool', 'contacts'])
  const comments = rootState.getIn(['salesTool', 'comments'])
  const statuses = rootState.getIn(['salesTool', 'statuses'])
  const year = rootState.getIn(['salesTool', 'year'])
  const users = rootState
    .getIn(['members', 'users'])
    .toJS()
    .filter(u => u.userRole === 'sales_group')

  return {
    companies,
    currentUser,
    contacts,
    comments,
    statuses,
    users,
    selectedYear: year,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: year => dispatch(getUsers(year)),
    loadCompanies: () => dispatch(loadCompanies()),
    loadCompany: id => dispatch(loadCompany(id)),
    loadStatuses: () => dispatch(loadStatuses()),
    updateCompany: (id, year, body) => dispatch(updateCompany(id, year, body)),
    updateContact: (id, body) => dispatch(updateContact(id, body)),
    deleteContact: (contactId, companyId) =>
      dispatch(deleteContact(contactId, companyId)),
    addContact: (body, companyId) => dispatch(addContact(body, companyId)),
    loadContacts: companyId => dispatch(loadContacts(companyId)),
    loadComments: (companyId, studsYear) =>
      dispatch(loadComments(companyId, studsYear)),
    addComment: (text, companyId) => dispatch(addComment(text, companyId)),
    deleteComment: (commentId, companyId) =>
      dispatch(deleteComment(commentId, companyId)),
    updateComment: (id, text) => dispatch(updateComment(id, text)),
    setStudsYear: year => dispatch(setStudsYear(year)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDetails)
