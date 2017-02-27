/*
 *
 * Events
 *
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import selectEvents from './selectors';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import messages from './messages';
import styles from './styles.css';
import MasterDetail from '../../components/MasterDetail';
import EventListItem from '../../components/EventListItem';
import EventDetail from '../../components/EventDetail';
import EventStaticDetail from '../../components/EventStaticDetail';
import EventEdit from '../../components/EventEdit';
import * as actions from './actions';

export class Events extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { get } = this.props;
    get();
  }

  renderActions(user) {
    if(!user || !user.permissions.includes('admin')) {
      return null;
    }
    return (
      <div className={styles.actions}>
        <Link to="/events/new"><FormattedMessage {...messages.create} /></Link>
      </div>
    );
  }

  renderEventsList(events, user) {
    const items = events.map(e => <EventListItem key={e.id} event={e} />);
    return (
      <div className={styles.listContainer}>
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <div><FormattedMessage {...messages.company} /></div>
            <div><FormattedMessage {...messages.date} /></div>
          </div>
          { items }
        </div>
        { this.renderActions(user) }
      </div>
    );
  }

  render() {
    const { events, user, route, params, update } = this.props;

    let detail;
    let detailSelected = false;
    if(params.id) {
      const event = events.items.find(e => e.id == params.id);
      if(route.name === 'events/edit') {
        detail = <EventEdit event={event} update={update} />;
      } else {
        detail = <EventDetail event={event} user={user} />;
      }
      detailSelected = true;
    } else {
      detail = <EventStaticDetail />
    }

    return (
      <div className={styles.events}>
        <MasterDetail
          master={this.renderEventsList(events.items, user)}
          detail={detail}
          detailSelected={detailSelected} />
      </div>
    );
  }
}

const mapStateToProps = selectEvents();

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
