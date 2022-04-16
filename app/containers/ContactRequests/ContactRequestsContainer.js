import ContactRequest from './ContactRequests'
import { connect } from 'react-redux'
import { loadContactRequests } from '../../store/salesTool/contactRequests/actions'

const mapStateToProps = rootState => {
  const contactRequests = rootState.getIn(['salesTool', 'contactRequests'])

  return { contactRequests }
}

const mapDispatchToProps = dispatch => {
  return {
    loadContactRequests: () => dispatch(loadContactRequests()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactRequest)
