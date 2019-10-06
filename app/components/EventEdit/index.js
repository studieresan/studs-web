import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getEmptyEventObject } from 'containers/Events/reducer'
import selectEvents from 'containers/Events/selectors'
import * as EventActions from 'containers/Events/actions'

import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { sortedUniq, sortBy } from 'lodash'
import { uploadImage } from 'api'
import messages from './messages'
import styles from './styles.css'
import Textarea from 'react-textarea-autosize'
import Button from 'components/Button'
import EventEditPicture from 'components/EventEditPicture'
import EventEditSurvey from 'components/EventEditSurvey'

import { hasData } from 'containers/SalesTool/store/constants'

class EventEdit extends React.Component {
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
    } = this.props
    const data = {}
    if (e.target.type === 'file') {
      uploadImage(e.target.files[0]).then(url => {
        addPicture(url, id)
      })
    } else {
      if (e.target.name === 'date') {
        data[e.target.name] = new Date(e.target.value)
      } else {
        data[e.target.name] = e.target.value
      }
      console.log(data)
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
    if (event.companyName) {
      save(event)

      // Change the save button label to "Saved" for a few seconds
      this.setState({ showSavedLabel: true })
      this.saveBtnTimer = setTimeout(() => {
        this.setState({ showSavedLabel: false })
      }, 1000)
    } else {
      alert('You must select a company before saving.')
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
      companyUsers,
      events: { saving, saved },
      removePicture,
      removeSurvey,
      companies,
    } = this.props

    const companyOption = company => (
      <option key={company.id} value={company.name}>
        {company.name}
      </option>
    )

    const companiesList = hasData(companies)
      ? Object.keys(companies.data).map(k => companies.data[k])
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
          <h2>{event.companyName}</h2>
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
        <input
          name='responsible'
          placeholder=''
          value={event.responsible || ''}
          onChange={this.handleChange}
        />
        <div className={styles.inputLabel}>
          <FormattedMessage {...messages.company} />
        </div>
        <div className={styles.selectContainer}>
          <select
            name='companyName'
            placeholder='Company'
            value={event.companyName || ''}
            onClick={this.handleChange}
            onChange={this.handleChange}
          >
            <option key='none' disabled>
              Select company
            </option>
            {companiesList && companiesList.map(companyOption)}
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

  update: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  companyUsers: PropTypes.array.isRequired,
  addPicture: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
  addSurvey: PropTypes.func.isRequired,
  removeSurvey: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
}

const mapStateToProps = rootState => {
  const companies = rootState.getIn(['salesTool', 'companies'])
  return {
    ...selectEvents()(rootState),
    companies,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...EventActions }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventEdit)
