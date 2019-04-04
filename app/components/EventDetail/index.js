import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Markdown from 'react-markdown'
import Button from 'components/Button'
import { hasEventPermission } from 'users'

import moment from 'moment'
import styles from './styles.css'
import IndicatorIcon from 'components/IndicatorIcon'
import { Link } from 'react-router-dom'

export class EventDetail extends Component {
  render() {
    const { event, user, onRemoveEvent } = this.props
    if (!event) {
      return null
    }
    let after, before
    if (event.after && event.before) {
      const userList = person => (
        <li key={person.id}>
          {person.first_name} {person.last_name}
        </li>
      )
      before = event.before.map(userList)
      after = event.after.map(userList)
    }
    return (
      <div className={styles.eventDetail}>
        <div className={styles.head}>
          <h2>{event.companyName}</h2>
          {hasEventPermission(user) && (
            <div className={styles.buttonRow}>
              <Link to='/create-event-feedback'>
                <Button color='bright'>
                  <FormattedMessage {...messages.generateFeedback} />
                </Button>
              </Link>
              <Link to={`/events/${event.id}/edit`}>
                <Button color='bright'>
                  <FormattedMessage {...messages.edit} />
                </Button>
              </Link>
              <Button color='danger' onClick={() => onRemoveEvent(event.id)}>
                <FormattedMessage {...messages.delete} />
              </Button>
            </div>
          )}
        </div>
        <div className={styles.info}>
          {event && event.responsible && (
            <div>
              <h4>Responsible</h4>
              <div>{event.responsible}</div>
            </div>
          )}
          <div>
            <h4>
              <FormattedMessage {...messages.date} />
            </h4>
            <div>
              {event.date && moment(event.date).format('MMM DD, HH:mm')}
            </div>
          </div>
          <div>
            <h4>
              <FormattedMessage {...messages.location} />
            </h4>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=
              + ${encodeURIComponent(event.location)}`}
              target='_blank'
            >
              {event.location}
            </a>
          </div>
          {user && user.type === 'studs_member' && (
            <div>
              <h4>
                <FormattedMessage {...messages.surveys} />
              </h4>
              <div>
                <IndicatorIcon ok={this.props.preEventFormReplied} />
                <Link to={`/events/${event.id}/pre_form`}>Pre Event Form</Link>
              </div>
              <div>
                <IndicatorIcon ok={this.props.postEventFormReplied} />
                <Link to={`/events/${event.id}/post_form`}>
                  Post Event Form
                </Link>
              </div>
            </div>
          )}
        </div>
        {event.publicDescription && (
          <div>
            <hr />
            <h2>
              <FormattedMessage {...messages.description} />
            </h2>
            <Markdown source={event.publicDescription} />
          </div>
        )}
        {user.type === 'studs_member' && event.privateDescription && (
          <div>
            <hr />
            <h2>
              <FormattedMessage {...messages.privateDescription} />
            </h2>
            <Markdown source={event.privateDescription} />
          </div>
        )}
        {event.formData && event.feedbackText && (
          <div>
            <hr />
            <h2>
              <FormattedMessage {...messages.feedback} />
            </h2>
            <Markdown source={event.feedbackText} />
          </div>
        )}
        {hasEventPermission(user) &&
        ((before && before.length) || (after && after.length)) ? (
          <div>
            <hr />
            <h2>
              <FormattedMessage {...messages.missing} />
            </h2>
            <div className={styles.missing}>
              <div>
                {before && before.length ? (
                  <div>
                    <div className={styles.missingHead}>Before</div>
                    {!event.remindedBefore && (
                      <button
                        name='before'
                        onClick={this.handleRemindClick}
                        className='btn-default'
                      >
                        Remind on slack
                      </button>
                    )}
                    <ul>{before}</ul>
                  </div>
                ) : null}
              </div>
              <div>
                {after && after.length ? (
                  <div>
                    <div className={styles.missingHead}>After</div>
                    {!event.remindedAfter && (
                      <button
                        name='after'
                        onClick={this.handleRemindClick}
                        className='btn-default'
                      >
                        Remind on slack
                      </button>
                    )}
                    <ul>{after}</ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

EventDetail.propTypes = {
  id: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onRemoveEvent: PropTypes.func.isRequired,
  preEventFormReplied: PropTypes.bool.isRequired,
  postEventFormReplied: PropTypes.bool.isRequired,
}
