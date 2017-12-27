/**
*
* EventEdit
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import Cleave from 'cleave.js/dist/cleave-react';
import Textarea from 'react-textarea-autosize';

class EventEdit extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleImportClick = this.handleImportClick.bind(this);
  }

  handleChange(e) {
    const { update, event: { id } } = this.props;
    const data = {};
    if (e.target.type == 'file') {
      data[e.target.name] = e.target.files[0];
    } else {
      data[e.target.name] = e.target.value;
    }

    update(data, id);
  }

  handleSave() {
    const { save, create, event } = this.props;
    if(event.id) {
      save(event);
    } else {
      create(event);
    }
  }

  handleImportClick() {
    const { importFormData, event } = this.props;
    importFormData(event.id);
  }

  render() {
    const { event, companies, saving } = this.props;
    if(!event) {
      return null;
    }
    return (
      <div className={styles.eventEdit}>
        <div className={styles.head}>
          <h2>Event: {event.companyName} - {event.date}</h2>
          { !saving &&
            <button onClick={this.handleSave} className='btn-bright'>Save</button>
          }
        </div>
        <div className='input-label'><FormattedMessage {...messages.company} /></div>
        <div className={styles.selectContainer}>
          <select
            name='company'
            placeholder='Company'
            value={event.company}
            onChange={this.handleChange}>
            <option key='none' value={null} disabled>Select company</option>
            {companies && companies.map(c =>
              <option key={c.id} value={c.id}>{c.name}</option>
            )}
          </select>
        </div>
        <div className='input-label'><FormattedMessage {...messages.date} /></div>
        <Cleave
          name='date'
          placeholder='YYYY/MM/DD'
          value={event.date}
          onChange={this.handleChange}
          options={{ date: true, datePattern: ['Y', 'm', 'd']}} />
        <div className='input-label'><FormattedMessage {...messages.description} /></div>
        <Textarea
          name='description'
          placeholder='Description'
          onChange={this.handleChange}
          value={event.description} />
        <div className='input-label'><FormattedMessage {...messages.publicText} /></div>
        <Textarea
          name='publicText'
          placeholder='Public text'
          onChange={this.handleChange}
          value={event.publicText} />
        <div className='input-label'><FormattedMessage {...messages.feedbackText} /></div>
        <Textarea
          name='feedbackText'
          placeholder='Feedback text'
          onChange={this.handleChange}
          value={event.feedbackText} />
        <div className='input-label'><FormattedMessage {...messages.beforeSurvey} /></div>
        <input
          name='beforeSurvey'
          placeholder='URL'
          value={event.beforeSurvey}
          onChange={this.handleChange} />
        <div className='input-label'><FormattedMessage {...messages.beforeSurveyId} /></div>
        <input
          name='beforeSurveyId'
          placeholder='ID'
          value={event.beforeSurveyId}
          onChange={this.handleChange} />
        <div className='input-label'><FormattedMessage {...messages.afterSurvey} /></div>
        <input
          name='afterSurvey'
          placeholder='URL'
          value={event.afterSurvey}
          onChange={this.handleChange} />
        <div className='input-label'><FormattedMessage {...messages.afterSurveyId} /></div>
        <input
          name='afterSurveyId'
          placeholder='ID'
          value={event.afterSurveyId}
          onChange={this.handleChange} />
        <div className={styles.import}>
          <button onClick={this.handleImportClick} className='btn-default'>Import form data</button>
          { event.importedData && 'Imported' }
        </div>
        <div className='input-label'><FormattedMessage {...messages.picture1} /></div>
        <input
          type='file'
          name='picture1'
          onChange={this.handleChange}/>
        <div className='input-label'><FormattedMessage {...messages.picture2} /></div>
        <input
          type='file'
          name='picture2'
          onChange={this.handleChange}/>
        <div className='input-label'><FormattedMessage {...messages.picture3} /></div>
        <input
          type='file'
          name='picture3'
          onChange={this.handleChange}/>
      </div>
    );
  }
}

export default EventEdit;
