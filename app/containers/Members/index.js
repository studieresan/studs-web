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
import { FormattedMessage } from 'react-intl'
import messages from './messages'

export class Members extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  renderMembersList(users) {
    const sortedUsers = sortBy(users, ['firstName'])
    const { selectMember, selectedMember } = this.props
    return (
      <div className={styles.memberList}>
        <div className={styles.listHeader}>
          <div>Members</div>
        </div>
        {sortedUsers.map(user => (
          <MemberListItem
            key={user.id}
            selectMember={selectMember}
            active={selectedMember === user.id}
            user={user}
          />
        ))}
      </div>
    )
  }

  render() {
    const users = this.props.users
    const id = this.props.match.params.id
    const user = users.find(u => u.id === id)

    let detail
    let detailSelected = false
    if (user) {
      detail = (
        <CV
          user={user}
          cv={user.cv}
          print={!!this.props.match.params.print}
          donePrint={() => this.props.history.push('/members/' + user.id)}
        />
      )
      detailSelected = true
    } else {
      detail = <MembersStaticDetail />
    }

    return (
      <div className={styles.members}>
        <div className={styles.members_title}>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
        <MasterDetail
          master={this.renderMembersList(users)}
          detail={detail}
          detailSelected={detailSelected}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedMember: state.getIn(['members', 'selectedMember']),
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
    })
  ),
  match: PropTypes.object,
  history: PropTypes.object,
  selectMember: PropTypes.func.isRequired,
  selectedMember: PropTypes.string.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members)
