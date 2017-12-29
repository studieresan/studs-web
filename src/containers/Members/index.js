import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './styles.css'
import MemberListItem from '../../components/MemberListItem'
import MembersStaticDetail from '../../components/MembersStaticDetail'
import CV from '../../components/Cv'
import MasterDetail from '../../components/MasterDetail'
import * as actions from './actions'
import PropTypes from 'prop-types'
import sortBy from 'lodash/sortBy'

export class Members extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }
  renderMembersList(users) {
    const sortedUsers = sortBy(users, ['firstName'])
    return (
      <div className={styles.memberList}>
        { sortedUsers.map(user => <MemberListItem key={user.id} user={user}/>) }
      </div>
    )
  }
  render() {
    const users = this.props.users
    let detail
    let detailSelected = false
    const id = this.props.match.params.id
    const user = users.find(u => u.id === id)
    if (user) {
      detail = <CV user={user} cv={user.cv} />
      detailSelected = true
    } else {
      detail = <MembersStaticDetail />
    }
    return (
      <div className={styles.members}>
        <MasterDetail
          master={this.renderMembersList(users)}
          detail={detail}
          detailSelected={detailSelected} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.getIn(['members', 'users']).toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

Members.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      id: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string,
      master: PropTypes.string,
      picture: PropTypes.string,
      cv: PropTypes.object,
    })),
  match: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)
