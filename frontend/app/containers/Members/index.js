/*
 *
 * Members
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectMembers from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import MemberListItem from '../../components/MemberListItem';
import MembersStaticDetail from '../../components/MembersStaticDetail';
import CV from '../../components/Cv';
import MasterDetail from '../../components/MasterDetail';
import * as actions from './actions';

export class Members extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getUsers();
  }
  renderMembersList(users) {
    return (
      <div>
        { users.map(user => <MemberListItem key={user.id} user={user}/>) }
      </div>
    );
  }
  render() {
    const users = this.props.users.toJS();
    let detail;
    let detailSelected = false;
    const id = this.props.params.id;
    const user = users.find(u => u.id === id);
    if(user) {
      detail = <CV user={user} />;
      detailSelected = true;
    } else {
      detail = <MembersStaticDetail />;
    }
    return (
      <div className={styles.members}>
        <MasterDetail
          master={this.renderMembersList(users)}
          detail={detail}
          detailSelected={detailSelected} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.getIn(['members', 'users'])
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Members);
