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
import EventEditSurvey from 'components/EventEditSurvey'

import { hasData } from 'store/salesTool/constants'

export default class EventEdit extends React.Component {
  // If this component is rendered before the events have been fetched,
  // for example on initial page load, we can use an empty event object
  // as a placeholder
  static defaultProps = {
    event: getEmptyEventObject(),
  }

  state = {
    beforeSurvey: '',
    afterSurvey: '',
    showSavedLabel: false,
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
      uploadImage(e.target.files[0]).then(url => {
        addPicture(url, id)
      })
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
    const { save, event } = this.props
    if (event.company.id && event.responsible.id) {
      save(event)

      // Change the save button label to "Saved" for a few seconds
      this.setState({ showSavedLabel: true })
      this.saveBtnTimer = setTimeout(() => {
        this.setState({ showSavedLabel: false })
      }, 1000)
    } else {
      alert('You must select a company and a responsible user before saving.')
    }
  }

  addSurvey = (surveyType, value, event) => {
    this.props.addSurvey(value, surveyType, event.id)
    if (surveyType === 'beforeSurveys') {
      this.setState({ beforeSurvey: '' })
    } else {
      this.setState({ afterSurvey: '' })
    }
  }

  render() {
    const {
      event,
      events: { saving, saved },
      removePicture,
      removeSurvey,
      companies,
      soldCompanies,
      users,
    } = this.props

    const companiesList = hasData(companies)
      ? soldCompanies.map(soldCompanyId => companies.data[soldCompanyId])
      : []

    const surveyListItem = surveyType => (url, i) => (
      <EventEditSurvey
        key={url + i}
        url={url}
        onRemove={() => removeSurvey(i, surveyType, event.id)}
      />
    )

    const saveBtnMessage = this.state.showSavedLabel
      ? messages.saved
      : messages.save

    return (
      <div className={styles.eventEdit}>
        <div className={styles.head}>
          <h2>{event.company.id ? event.company.name : 'New Event'}</h2>
          <div>
            <Link to={`/events/${event.id}`}>
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
              <FormattedMessage {...saveBtnMessage} />
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
        <div className={styles.selectContainer}>
          <select
            name='responsible'
            placeholder='Responsible user'
            value={event.responsible.id}
            onClick={this.handleChange}
            onChange={this.handleChange}
          >
            <option key='none' value={''} disabled>
              Select responsible user
            </option>
            {users &&
              users.map(user => (
                <option key={user.realId} value={user.realId}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
          </select>
        </div>
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.company} />
        </div>
        <div className={styles.selectContainer}>
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
        </div>
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
        {event.beforeSurveys &&
          event.beforeSurveys.map(surveyListItem('beforeSurveys'))}
        <input
          name='beforeSurveys'
          placeholder='Enter survey url. Press Enter when done.'
          value={this.state.beforeSurvey}
          onChange={e => this.setState({ beforeSurvey: e.target.value })}
          onKeyPress={e =>
            e.key === 'Enter' &&
            this.addSurvey(e.target.name, e.target.value, event)
          }
        />
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.afterSurvey} />
        </div>
        {event.afterSurveys &&
          event.afterSurveys.map(surveyListItem('afterSurveys'))}
        <input
          name='afterSurveys'
          placeholder='Enter survey url. Press Enter when done.'
          value={this.state.afterSurvey}
          onChange={e => this.setState({ afterSurvey: e.target.value })}
          onKeyPress={e =>
            e.key === 'Enter' &&
            this.addSurvey(e.target.name, e.target.value, event)
          }
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
        <input type='file' name='picture' onChange={this.handleChange} />
      </div>
    )
  }
}

EventEdit.propTypes = {
  /** can be null if we are creating a new event */
  event: PropTypes.object,

  // redux props
  companies: PropTypes.object.isRequired,
  soldCompanies: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  events: PropTypes.object.isRequired,

  update: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,

  addPicture: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
  addSurvey: PropTypes.func.isRequired,
  removeSurvey: PropTypes.func.isRequired,
}
