import React from 'react';

import styles from './styles.css';
import moment from 'moment';
import Markdown from 'react-markdown';

const PublicEvent = ({event}) => {
  if(!event) {
    return null;
  }

  return (
    <div name={event.id} className={styles.publicEvent}>
      <div className={styles.information}>
        <h1>{ event.company.name }</h1>
        <h2>{ moment(event.date).format('MMMM Do') } @ { event.company.address }</h2>
        <Markdown source={event.public_text}/>
      </div>
      <div className={styles.pictures}>
        <img src={event.picture_1}/>
        <img src={event.picture_2}/>
        <img src={event.picture_3}/>
      </div>
    </div>
  );
}

export default PublicEvent;
