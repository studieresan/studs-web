import SalesTool from './SalesTool'
import { connect } from 'react-redux'
import { loadCompanies, addCompany } from './store/companies/actions'

const mapStateToProps = (rootState, test) => {
  const companies = rootState.get('salesTool').companies
  return {
    companies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCompanies: () => dispatch(loadCompanies()),
    addCompany: name => dispatch(addCompany(name)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesTool)
