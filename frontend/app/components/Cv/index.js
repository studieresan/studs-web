/**
*
* Cv
*
*/

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import CvHeader from '../CvHeader';

const cv = {
  sections: [{
    title: 'Education',
    items: [{
      when: '2013 - 2018',
      where: 'KTH Royal Institute of Technology',
      description: 'Master of Science, Computer Sience\nBachelor of Science, Computer Science'
    }]
  }, {
    title: 'Work Experience',
    items: [{
      when: '2016',
      where: 'Studieresan',
      description: 'Atem quaeper ehentis explabo rrovide sequamus eosa quas quis ipsus, consequam as rem num quiatum volore nost, eation nihilitiis quame quiatat iaspelenet fugitat'
    }, {
      when: '2015',
      where: 'Asdf',
      description: 'Short description'
    }]
  }, {
    title: 'Projects',
    items: [{
      when: '2016',
      where: 'KTH Computer Science',
      description: 'Atem quaeper ehentis explabo rrovide sequamus eosa quas quis ipsus, consequam as rem num quiatum volore nost, eation nihilitiis quame quiatat iaspelenet fugitat'
    }]
  }]
}

function renderItem(item, i) {
  return (
    <div key={i} className={styles.item}>
      <div className={styles.when}>{item.when}</div>
      <div className={styles.where}>{item.where}</div>
      <div className={styles.description}>{item.description}</div>
    </div>
  )
}

function renderSection(section) {
  const items = section.items.map((item, i) => renderItem(item, i));
  return (
    <div key={section.title} className={styles.section} >
      <h2>{section.title}</h2>
      {items}
    </div>
  )
}

function Cv(props) {
  const sections = cv.sections.map(section => renderSection(section));
  return (
    <div className={styles.cv}>
      <div>
      <CvHeader user={props.user} />
      {sections}
      </div>
    </div>
  );
}

Cv.propTypes = {
  user: PropTypes.object.isRequired,
  cv: PropTypes.object.isRequired
};

export default Cv;
