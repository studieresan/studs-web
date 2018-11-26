import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Markdown from 'react-markdown'
import Button from 'components/Button'
import { Chart } from 'react-google-charts' // TODO replace with chart.js
import { hasEventPermission } from 'users'

import styles from './styles.css'
import A from 'components/A'
import IndicatorIcon from 'components/IndicatorIcon'
import EventEdit from '../EventEdit'
import Lightbox from 'components/Lightbox'

class EventDetail extends Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
    }
  }

  toggleEditing() {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

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
        {this.state.isEditing && (
          <Lightbox>
            <EventEdit
              event={event}
              toggleEditing={() => {
                this.toggleEditing()
              }}
            />
          </Lightbox>
        )}
        <div className={styles.head}>
          <h2>
            <FormattedMessage {...messages.event} />: {event.companyName} -{' '}
            {event.date && event.date.toString()}
          </h2>
          {hasEventPermission(user) && (
            <div className={styles.buttonRow}>
              <Button color='bright' onClick={() => this.toggleEditing()}>
                Edit
              </Button>
              <Button color='danger' onClick={() => onRemoveEvent(event.id)}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className={styles.info}>
          <div>
            <h4>Company</h4>
            <div>{event.companyName}</div>
          </div>
          <div>
            <h4>Location</h4>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.location
              )}`}
              target='_blank'
            >
              {event.location}
            </a>
          </div>
          {user && user.type === 'studs_member' && (
            <div>
              <h4>Surveys</h4>
              <div>
                <IndicatorIcon ok={event.beforeSurveyReplied} />
                <A target='_blank' href={event.beforeSurvey}>
                  <FormattedMessage {...messages.before} />
                </A>
              </div>
              <div>
                <IndicatorIcon ok={event.afterSurveyReplied} />
                <A target='_blank' href={event.afterSurvey}>
                  <FormattedMessage {...messages.after} />
                </A>
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
        {event.formData && (
          <div className={styles.charts}>
            <Chart
              chartType='PieChart'
              data={event.formData.beforeInterest}
              options={{
                title: 'Interest in the company before the event',
              }}
              graph_id='beforeInterest'
              width='100%'
            />
            <Chart
              chartType='PieChart'
              data={event.formData.afterInterest}
              options={{
                title: 'Interest in the company after the event',
              }}
              graph_id='afterInterest'
              width='100%'
            />
            <Chart
              chartType='PieChart'
              data={event.formData.knowDoes}
              options={{
                title: 'Do you know what the company does (before the event)?',
              }}
              graph_id='knowDoes'
              width='100%'
            />
            <Chart
              chartType='PieChart'
              data={event.formData.qualified}
              options={{
                title:
                  'Do you feel like you are qualified to work at' +
                  'this company?',
              }}
              graph_id='qualified'
              width='100%'
            />
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

function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']).toJS(),
  }
}

EventDetail.propTypes = {
  id: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onRemoveEvent: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(EventDetail)
