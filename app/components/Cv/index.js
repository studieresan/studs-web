import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'containers/App/actions'
import styles from './styles.css'
import CvHeader from '../CvHeader'
import dot from 'static/img/gold-dot.svg'

function renderItem(item, i) {
  if (!item) return null
  return (
    <div key={i} className={styles.item}>
      <div className={styles.meta}>
        <div className={styles.when}>{item.when}</div>
        <div className={styles.divider}>
          <img src={dot} />
          <img src={dot} />
          <img src={dot} />
          <img src={dot} />
          <img src={dot} />
          <img src={dot} />
          <img src={dot} />
        </div>
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
  const items = section.items.splice(1).map((item, i) => renderItem(item, i))
  return (
    <div key={section.title} className={styles.section}>
      <div className={styles.printWrapper}>
        {/* Keep title and first item together for printing, see styles.css */}
        <h2>{section.title.toLowerCase()}</h2>
        {renderItem(section.items[0], 0)}
      </div>
      {items}
    </div>
  )
}

const printResume = props => {
  props.setPrintMode(true)
  setTimeout(() => {
    window.print()
    props.donePrint()
    props.setPrintMode(false)
  }, 1000)
}

function PrintButton(props) {
  if (props.printMode) {
    return null
  }

  return (
    <button
      className={styles.printButton}
      onClick={() => {
        printResume(props)
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

class Cv extends React.Component {
  componentDidMount() {
    if (this.props.print && !this.props.printMode) {
      printResume(this.props)
    }
  }

  render() {
    let sections = null
    if (this.props.user.cv) {
      console.log('USER HAS CV', this.props.user)
      sections = this.props.user.cv.sections.map(section =>
        renderSection(section)
      )
    } else {
      console.log('User has no cv')
    }
    return (
      <div className={styles.cv}>
        <div>
          <CvHeader user={this.props.user} />
          {sections}
          <PrintButton {...this.props} />
        </div>
      </div>
    )
  }
}

Cv.propTypes = {
  user: PropTypes.object.isRequired,
  cv: PropTypes.object,
  print: PropTypes.bool,
  donePrint: PropTypes.func,
  printMode: PropTypes.bool.isRequired,
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
