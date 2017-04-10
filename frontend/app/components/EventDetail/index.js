/**
*
* EventDetail
*
*/

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; import { Link } from 'react-router'; import messages from './messages';
import Markdown from 'react-markdown';

import styles from './styles.css';
import A from '../A';
import IndicatorIcon from '../IndicatorIcon';

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.getMissingForms = this.getMissingForms.bind(this);
    this.handleRemindClick = this.handleRemindClick.bind(this);
  }

  getMissingForms() {
    const { id, getMissingForms } = this.props;
    getMissingForms(id);
  }

  handleRemindClick(e) {
    const { event, id, remindBefore, remindAfter } = this.props;
    const name = e.target.name;
    if(name === 'before') {
      remindBefore(id);
    } else if(name === 'after') {
      remindAfter(id);
    }
  }

  componentDidMount() {
    this.getMissingForms();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.id !== this.props.id) {
      this.getMissingForms();
    }
  }

  render() {
    const { event, user } = this.props;
    if(!event) {
      return null;
    }
    let after, before;
    if(event.after && event.before) {
      const userList = person => <li key={person.id}>{person.first_name} {person.last_name}</li>;
      before = event.before.map(userList);
      after = event.after.map(userList);
    }
    return (
      <div className={styles.eventDetail}>
        <div className={styles.head}>
          <h2><FormattedMessage {...messages.event} />: {event.companyName} - {event.date}</h2>
          { user && user.permissions.includes('event') ?
            <Link to={`/events/${event.id}/edit`} >
              <button className='btn-bright'>Edit</button>
            </Link>
          : null
          }
        </div>
        <div className={styles.info}>
          <div>
            <h4>Company</h4>
            <div>{event.companyName}</div>
          </div>
          { user && user.type === 'studs_member' ?
            <div>
              <h4>Surveys</h4>
              <div>
                <IndicatorIcon ok={event.beforeSurveyReplied} />
                <A target='_blank' href={event.beforeSurvey}><FormattedMessage {...messages.before} /></A>
              </div>
              <div>
                <IndicatorIcon ok={event.afterSurveyReplied} />
                <A target='_blank' href={event.afterSurvey}><FormattedMessage {...messages.after} /></A>
              </div>
            </div>
          : null
          }
        </div>
        { event.description &&
          <div>
            <hr />
            <h2><FormattedMessage {...messages.description} /></h2>
            <Markdown source={event.description}/>
          </div>
        }
        { event.feedbackText &&
          <div>
            <hr />
            <h2><FormattedMessage {...messages.feedback} /></h2>
            <Markdown source={event.feedbackText}/>
          </div>
        }
        { user && user.permissions.includes('event_missing') && (before && before.length || after && after.length) ?
          <div>
            <hr />
            <h2><FormattedMessage {...messages.missing} /></h2>
            <div className={styles.missing}>
              <div>
                { before && before.length ?
                  <div>
                    <div className={styles.missingHead}>Before</div>
                    { !event.remindedBefore &&
                      <button name='before' onClick={this.handleRemindClick} className='btn-default'>Remind on slack</button>
                    }
                    <ul>{before}</ul>
                  </div>
                : null
                }
              </div>
              <div>
                { after && after.length ?
                  <div>
                    <div className={styles.missingHead}>After</div>
                    { !event.remindedAfter &&
                      <button name='after' onClick={this.handleRemindClick} className='btn-default'>Remind on slack</button>
                    }
                    <ul>{after}</ul>
                  </div>
                : null
                }
              </div>
            </div>
          </div>
        : null
        }
      </div>
    );
  }
}

export default EventDetail;
