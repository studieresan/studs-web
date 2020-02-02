import SalesOverview from './SalesOverview'
import { connect } from 'react-redux'
import { loadCompanies } from 'store/salesTool/companies/actions'
import { getUsers } from 'containers/Members/actions'

const mapStateToProps = rootState => {
  const companies = rootState.getIn(['salesTool', 'companies'])
  const users = rootState.getIn(['members', 'users']).toJS()

  const userMap = {}
  users
    .filter(u => u.userRole === 'sales_group')
    .forEach(u => (userMap[u.realId] = u.firstName + ' ' + u.lastName))

  return { companies, users: userMap }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCompanies: () => dispatch(loadCompanies()),
    getUsers: () => dispatch(getUsers()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesOverview)
