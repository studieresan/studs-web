import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'containers/App/actions'
import styles from './styles.css'
import CvHeader from '../CvHeader'

function renderItem(item, i) {
  return (
    <div key={i} className={styles.item}>
      <div className={styles.meta}>
        <div className={styles.when}>{item.when}</div>
        <div className={styles.divider} />
        <div className={styles.where}>
          <div className={styles.title}>{item.title}</div>
          {item.organization && (
            <div className={styles.organization}>
              {item.organization}
              {item.city && <span> - {item.city}</span>}
            </div>
          )}
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

function PrintButton(props) {
  return (
    <button
      className={styles.printButton}
      style={{
        display: props.printMode ? 'none' : 'block',
      }}
      onClick={() => {
        props.setPrintMode(true)
        setTimeout(() => {
          window.print()
          props.setPrintMode(false)
        }, 1000)
      }}
    >
      Print CV
    </button>
  )
}

PrintButton.propTypes = {
  printMode: PropTypes.bool.isRequired,
  setPrintMode: PropTypes.func.isRequired,
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
        <PrintButton {...props} />
      </div>
    </div>
  )
}

Cv.propTypes = {
  user: PropTypes.object.isRequired,
  cv: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    printMode: state.getIn(['global', 'printMode']),
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cv)
