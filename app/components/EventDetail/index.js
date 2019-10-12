import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Markdown from 'react-markdown'
import Button from 'components/Button'
import { hasEventPermission } from 'users'

import moment from 'moment'
import styles from './styles.css'
import { Link } from 'react-router-dom'

export default class EventDetail extends Component {
  render() {
    const { event, user, users, onRemoveEvent } = this.props
    if (!event) {
      return null
    }

    const responsibleUser = users.find(u => u.realId === event.responsible.id)
    const responsibleName = responsibleUser
      ? responsibleUser.firstName + ' ' + responsibleUser.lastName
      : ''
    return (
      <div className={styles.eventDetail}>
        <div className={styles.head}>
          <h2>{event.company.name}</h2>
          {hasEventPermission(user) && (
            <div className={styles.buttonRow}>
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
          {event.responsible && (
            <div>
              <h4>
                <FormattedMessage {...messages.responsible} />
              </h4>
              <div>{responsibleName}</div>
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
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.location
              )}`}
              target='_blank'
            >
              {event.location}
            </a>
          </div>
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
        {event.privateDescription && (
          <div>
            <hr />
            <h2>
              <FormattedMessage {...messages.privateDescription} />
            </h2>
            <Markdown source={event.privateDescription} />
          </div>
        )}
        {(!!event.beforeSurveys.length || !!event.afterSurveys.length) && (
          <div>
            <hr />
            <h2>
              <FormattedMessage {...messages.surveys} />
            </h2>
            <div className={styles.surveys}>
              <div>
                <h3>
                  <FormattedMessage {...messages.before} />
                </h3>
                <ul>
                  {event.beforeSurveys.map((link, idx) => (
                    <li key={link}>
                      <a href={link} target='_blank'>
                        <FormattedMessage {...messages.survey} /> {idx}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>
                  <FormattedMessage {...messages.after} />
                </h3>
                <ul>
                  {event.afterSurveys.map((link, idx) => (
                    <li key={link}>
                      <a href={link} target='_blank'>
                        <FormattedMessage {...messages.survey} /> {idx}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

EventDetail.propTypes = {
  id: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  onRemoveEvent: PropTypes.func.isRequired,
}
