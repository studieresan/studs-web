import SalesTool from './SalesTool'
import { connect } from 'react-redux'
import {
  loadCompanies,
  addCompany,
  updateCompany,
} from './store/companies/actions'

const mapStateToProps = rootState => {
  const companies = rootState.getIn(['salesTool', 'companies'])
  return {
    companies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCompanies: () => dispatch(loadCompanies()),
    addCompany: name => dispatch(addCompany(name)),
    updateCompany: (id, body) => dispatch(updateCompany(id, body)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesTool)
