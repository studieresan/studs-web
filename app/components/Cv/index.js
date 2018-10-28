import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import CvHeader from '../CvHeader'

function renderItem(item, i) {
  return (
    <div key={i} className={styles.item}>
      <div className={styles.meta}>
        <div className={styles.when}>{item.when}</div>
        <div className={styles.divider}/>
        <div className={styles.where}>
          <div className={styles.title}>{item.title}</div>
          { item.organization &&
            <div className={styles.organization}>
              {item.organization}
              { item.city && <span> - {item.city}</span> }
            </div>
          }
        </div>
      </div>
      <div className={styles.description}>{item.description}</div>
    </div>
  )
}

function renderSection(section) {
  const items = section.items.map((item, i) => renderItem(item, i))
  return (
    <div key={section.title} className={styles.section}>
      <h2>{section.title.toLowerCase()}</h2>
      {items}
    </div>
  )
}

function Cv(props) {
  let sections = null
  if (props.cv) {
    sections = props.cv.sections.map(section => renderSection(section))
  }

  return (
    <div className={styles.cv}>
      <div>
        <CvHeader user={props.user} />
        {sections}
      </div>
    </div>
  )
}

Cv.propTypes = {
  user: PropTypes.object.isRequired,
  cv: PropTypes.object,
}

export default Cv
