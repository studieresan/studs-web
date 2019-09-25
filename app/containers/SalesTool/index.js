import SalesTool from './SalesTool'
import { connect } from 'react-redux'
import {
  loadCompanies,
  addCompany,
  updateCompany,
} from './store/companies/actions'

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

const mapStateToProps = rootState => {
  const currentUser = rootState.getIn(['global', 'user']).toJS()
  const companies = rootState.getIn(['salesTool', 'companies'])
  const contacts = rootState.getIn(['salesTool', 'contacts'])
  const comments = rootState.getIn(['salesTool', 'comments'])
  return {
    companies,
    currentUser,
    contacts,
    comments,
  }
}

const mapDispatchToProps = dispatch => {
  return {
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
