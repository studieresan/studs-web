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

class EventEdit extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { update } = this.props;
    const data = {};
    data[e.target.name] = e.target.value;
    update(data);
  }

  render() {
    const { event } = this.props;
    return (
      <div className={styles.eventEdit}>
        <div className={styles.head}>
          <h2>Event: {event.company} - {event.date}</h2>
          <button className='btn-bright'>Save</button>
        </div>
        <div className='input-label'><FormattedMessage {...messages.company} /></div>
        <input
          name='company'
          placeholder='Company'
          value={event.company}
          onChange={this.handleChange} />
        <div className='input-label'><FormattedMessage {...messages.date} /></div>
        <Cleave
          name='date'
          placeholder='YY/MM/DD'
          value={event.date}
          onChange={this.handleChange}
          options={{ date: true, datePattern: ['y', 'm', 'd']}} />
        <div className='input-label'><FormattedMessage {...messages.description} /></div>
        <textarea
          name='description'
          placeholder='Description'
          onChange={this.handleChange}
          value={event.description} />
      </div>
    );
  }
}

export default EventEdit;
