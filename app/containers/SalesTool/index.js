import SalesTool from './SalesTool'
import { connect } from 'react-redux'
import { loadCompanies } from './store/companies/actions'

const mapStateToProps = (rootState, test) => {
  const companies = rootState.get('salesTool').companies
  return {
    companies,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCompanies: () => dispatch(loadCompanies()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesTool)
