import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getEmptyEventObject } from 'store/events/reducer'

import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { uploadImage } from 'api'
import messages from './messages'
import styles from './styles.css'
import Textarea from 'react-textarea-autosize'
import Button from 'components/Button'
import EventEditPicture from 'components/EventEditPicture'

import { hasData } from 'store/salesTool/constants'

export default class EventEdit extends React.Component {
  // If this component is rendered before the events have been fetched,
  // for example on initial page load, we can use an empty event object
  // as a placeholder
  static defaultProps = {
    event: getEmptyEventObject(),
  }

  saveBtnTimer = null

  componentWillUnmount() {
    clearTimeout(this.saveBtnTimer)
  }

  handleChange = e => {
    const {
      addPicture,
      event: { id },
      companies,
    } = this.props
    if (e.target.type === 'file') {
      Object.values(e.target.files).forEach(file =>
        uploadImage(file).then(url => {
          addPicture(url, id)
        })
      )
    } else {
      const data = {}
      switch (e.target.name) {
        case 'date':
          data[e.target.name] = new Date(e.target.value)
          break
        case 'company':
          data[e.target.name] = {
            id: e.target.value,
            name: e.target.value ? companies.data[e.target.value].name : '',
          }
          break
        case 'responsible':
          data[e.target.name] = {
            id: e.target.value,
          }
          break
        default:
          data[e.target.name] = e.target.value
          break
      }
      this.update(data)
    }
  }

  update = data => {
    const {
      update,
      event: { id },
    } = this.props
    update(data, id)
  }

  handleSave = () => {
    const { save, event, studsYear } = this.props
    event.studsYear = studsYear
    this.update({ studsYear: studsYear }, event.id)
    if (
      event.responsible &&
      event.company &&
      event.company.id &&
      event.responsible.id
    ) {
      save(event)
    } else {
      alert('You must select a company and a responsible user before saving.')
    }
  }

  render() {
    const {
      event,
      events: { saving, saved },
      removePicture,
      companies,
      users,
    } = this.props

    //TODO - filter sold companies
    const companiesList = hasData(companies)
      ? Object.values(companies.data)
      : []
    const eventUsers = users.filter(u => u.userRole === 'event_group')

    return (
      <div className={styles.eventEdit}>
        <div className={styles.head}>
          <h2>{event.company.id ? event.company.name : 'New Event'}</h2>
          <div>
            <Link to={`/events/${event.id ? event.id : ''}`}>
              <Button color={'danger'}>
                <FormattedMessage {...messages.cancel} />
              </Button>
            </Link>
            <Button
              onClick={this.handleSave}
              type='submit'
              color={'default'}
              disabled={saving || saved}
              rounded={true}
            >
              <FormattedMessage {...messages.save} />
            </Button>
          </div>
        </div>
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.published} />
          <input
            className={styles.checkbox}
            type='checkbox'
            name='published'
            checked={event.published}
            onChange={e =>
              this.update({ published: !!e.target.checked }, event.id)
            }
          />
        </div>
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.responsible} />
        </div>
        <div>
          <select
            name='responsible'
            placeholder='Responsible user'
            value={event.responsible ? event.responsible.id : null}
            onClick={this.handleChange}
            onChange={this.handleChange}
          >
            <option key='none' value={''} disabled>
              Select responsible user
            </option>
            {eventUsers &&
              eventUsers.map(user => (
                <option key={user.realId} value={user.realId}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
          </select>
        </div>
        {!event.id && [
          <div key='newCompLable' className={styles.inputLabel}>
            <FormattedMessage {...messages.company} />
          </div>,
          <div key='newCompSelect'>
            <select
              name='company'
              placeholder='Company'
              value={event.company.id}
              onClick={this.handleChange}
              onChange={this.handleChange}
            >
              <option key='none' value={''} disabled>
                Select company
              </option>
              {companiesList &&
                companiesList.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
            </select>
          </div>,
        ]}
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.date} />
        </div>
        <input
          name='date'
          type='datetime-local'
          value={moment(event.date).format('YYYY-MM-DDTHH:mm')}
          onChange={this.handleChange}
        />
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.location} />
        </div>
        <input
          name='location'
          placeholder='location'
          value={event.location || ''}
          onChange={this.handleChange}
        />
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.publicDescription} />
        </div>
        <Textarea
          name='publicDescription'
          placeholder='Public Description'
          onChange={this.handleChange}
          value={event.publicDescription || ''}
        />
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.privateDescription} />
        </div>
        <Textarea
          name='privateDescription'
          placeholder='Private text'
          onChange={this.handleChange}
          value={event.privateDescription || ''}
        />
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.beforeSurvey} />
        </div>
        <Textarea
          name='beforeSurvey'
          placeholder='Enter survey url'
          value={event.beforeSurvey || ''}
          onChange={this.handleChange}
        />
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.afterSurvey} />
        </div>
        <Textarea
          name='afterSurvey'
          placeholder='Enter survey url'
          value={event.afterSurvey || ''}
          onChange={this.handleChange}
        />
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.pictures} />
        </div>
        <div className={styles.eventPictures}>
          {event.pictures &&
            event.pictures.map((url, i) => (
              <div className={styles.eventPicture} key={url + i}>
                <EventEditPicture
                  url={url}
                  onRemove={() => removePicture(i, event.id)}
                />
              </div>
            ))}
        </div>
        <input
          type='file'
          name='picture'
          onChange={this.handleChange}
          multiple
        />
      </div>
    )
  }
}

EventEdit.propTypes = {
  /** can be null if we are creating a new event */
  event: PropTypes.object,
  studsYear: PropTypes.number.isRequired,
  // redux props
  companies: PropTypes.object.isRequired,
  soldCompanies: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  events: PropTypes.object.isRequired,

  update: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,

  addPicture: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
  setSurvey: PropTypes.func.isRequired,
}
