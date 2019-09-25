import SalesTool from './SalesTool'
import { connect } from 'react-redux'
import {
  loadCompanies,
  addCompany,
  updateCompany,
} from './store/companies/actions'

import { loadContacts, updateContact } from './store/contacts/actions'

const mapStateToProps = rootState => {
  const currentUser = rootState.getIn(['global', 'user']).toJS()
  const companies = rootState.getIn(['salesTool', 'companies'])
  const contacts = rootState.getIn(['salesTool', 'contacts'])
  return {
    companies,
    currentUser,
    contacts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCompanies: () => dispatch(loadCompanies()),
    addCompany: name => dispatch(addCompany(name)),
    updateCompany: (id, body) => dispatch(updateCompany(id, body)),
    updateContact: (id, body) => dispatch(updateContact(id, body)),
    loadContacts: companyId => dispatch(loadContacts(companyId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesTool)
