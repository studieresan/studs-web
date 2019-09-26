import CompanyDetails from './CompanyDetails'
import { connect } from 'react-redux'
import { updateCompany, loadCompany } from './store/companies/actions'
import { loadStatuses } from './store/statuses/actions'

import {
  loadContacts,
  updateContact,
  deleteContact,
  addContact,
} from './store/contacts/actions'

import {
  loadComments,
  addComment,
  deleteComment,
  updateComment,
} from './store/comments/actions'

import { getUsers } from '../Members/actions'

const mapStateToProps = rootState => {
  const currentUser = rootState.getIn(['global', 'user']).toJS()
  const companies = rootState.getIn(['salesTool', 'companies'])
  const contacts = rootState.getIn(['salesTool', 'contacts'])
  const comments = rootState.getIn(['salesTool', 'comments'])
  const statuses = rootState.getIn(['salesTool', 'statuses'])
  const users = rootState.getIn(['members', 'users']).toJS()

  const userMap = {}
  users.forEach(u => (userMap[u.realId] = u.firstName + ' ' + u.lastName))
  return {
    companies,
    currentUser,
    contacts,
    comments,
    statuses,
    users: userMap,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    loadCompany: id => dispatch(loadCompany(id)),
    loadStatuses: () => dispatch(loadStatuses()),
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
)(CompanyDetails)
