import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import TextArea from 'react-textarea-autosize'
import CvHeader from '../../components/CvHeader'
import { ChevronDown, ChevronUp } from 'react-feather'

const styles = {}
import cvStyles from '../../components/Cv/styles.css'
import ownStyles from './styles.css'
Object.assign(styles, cvStyles, ownStyles)

const SMALL_FIELD_MAX_LENGTH = 100
const LARGE_FIELD_MAX_LENGTH = 1000
const MAX_SECTIONS = 8
const MAX_ITEMS = 15

export class CvEdit extends React.Component {

  constructor(props) {
    super(props)
    this.onSectionChange = this.onSectionChange.bind(this)
    this.onItemChange = this.onItemChange.bind(this)
    this.onAddItemClick = this.onAddItemClick.bind(this)
    this.onMoveItemClick = this.onMoveItemClick.bind(this)
    this.onRemoveItemClick = this.onRemoveItemClick.bind(this)
    this.onRemoveSectionClick = this.onRemoveSectionClick.bind(this)
  }

  componentDidMount() {
    this.props.getCv(this.props.params.id)
  }

  onSectionChange(index, event) {
    const { updateSection } = this.props
    updateSection(index, {title: event.target.value})
    this.props.saveCv(this.props.params.id)
  }

  onRemoveSectionClick(index) {
    this.props.removeSection(index)
    this.props.saveCv(this.props.params.id)
  }

  onItemChange(section, index, event) {
    const { updateItem } = this.props
    const item = {}
    item[event.target.name] = event.target.value
    updateItem(section, index, item)
    this.props.saveCv(this.props.params.id)
  }

  onAddItemClick(section) {
    this.props.addItem(section)
    this.props.saveCv(this.props.params.id)
  }

  onRemoveItemClick(section, index) {
    this.props.removeItem(section, index)
    this.props.saveCv(this.props.params.id)
  }

  onMoveItemClick(item, sectionIndex, fromIndex, toIndex) {
    this.props.moveItem(item, sectionIndex, fromIndex, toIndex)
    this.props.saveCv(this.props.params.id)
  }

  renderItem(item, sectionIndex, index, section) {
    const moveDownDisabled = index === section.items.length - 1
    const moveUpDisabled = index === 0
    return (
      <div key={index} className={`${styles.item} ${cvStyles.item}`}>
        <div className={styles.meta}>
          <div className={styles.arrows}>
            <button
              className={moveUpDisabled ? styles.arrowDisabled : ''}
              disabled={moveUpDisabled}
              onClick={() =>
                this.onMoveItemClick(item, sectionIndex, index, index - 1)}>
              <ChevronUp/>
            </button>
            <button
              className={moveDownDisabled ? styles.arrowDisabled : ''}
              disabled={moveDownDisabled}
              onClick={() =>
                this.onMoveItemClick(item, sectionIndex, index, index + 1)}>
              <ChevronDown/>
            </button>
          </div>
          <div className={styles.when}>
            <TextArea
              name='when'
              placeholder='When'
              value={item.when}
              onChange={this.onItemChange.bind(null, sectionIndex, index)}
              maxLength={SMALL_FIELD_MAX_LENGTH}
            />
          </div>
          <div className={styles.divider}/>
          <div className={styles.where}>
            <TextArea
              name='title'
              placeholder='Title'
              value={item.title}
              onChange={this.onItemChange.bind(null, sectionIndex, index)}
              maxLength={SMALL_FIELD_MAX_LENGTH}
            />
            <TextArea
              name='organization'
              placeholder='Organization'
              value={item.organization}
              onChange={this.onItemChange.bind(null, sectionIndex, index)}
              maxLength={SMALL_FIELD_MAX_LENGTH}
            />
            <TextArea
              name='city'
              placeholder='City'
              value={item.city}
              onChange={this.onItemChange.bind(null, sectionIndex, index)}
              maxLength={SMALL_FIELD_MAX_LENGTH}
            />
          </div>
        </div>
        <div className={styles.description}>
          <TextArea
            name='description'
            placeholder='Description'
            value={item.description}
            onChange={this.onItemChange.bind(null, sectionIndex, index)}
            maxLength={LARGE_FIELD_MAX_LENGTH}
          />
        </div>
        <div
          className={styles.remove}
          onClick={this.onRemoveItemClick.bind(null, sectionIndex, index)}>
            Remove
        </div>
      </div>
    )
  }
  renderSection(section, index) {
    const items =
      section.items.map((item, i) => this.renderItem(item, index, i, section))
    const addItemEnabled = section.items.length < MAX_ITEMS
    const addItemClasses = addItemEnabled
      ? 'btn-bright'
      : 'btn-disabled'
    return (
      <div key={index} className={styles.section}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={section.title}
          onChange={this.onSectionChange.bind(null, index)}
          maxLength={SMALL_FIELD_MAX_LENGTH}/>
        {items}
        <div className={styles.sectionActions}>
          <button
            className='btn-default'
            onClick={this.onRemoveSectionClick.bind(null, index)}>
             Remove Section
          </button>
          <button
            className={addItemClasses}
            onClick={this.onAddItemClick.bind(null, index)}
            disabled={!addItemEnabled}>
              Add Item
          </button>
        </div>
      </div>
    )
  }
  render() {
    if (!this.props.content.get('sections')) {
      // TODO Show better loading indicator
      return <p className='center'>Loading</p>
    }
    const sections = this.props.content.get('sections').toJS()
    let header = null
    if (this.props.user) {
      header = <CvHeader user={this.props.user.toJS()} />
    }
    let saveStatus = null
    if (this.props.saved) {
      saveStatus = 'Saved'
    } else if (this.props.saving) {
      saveStatus = 'Saving'
    } else if (this.props.saveErr) {
      saveStatus = 'Error'
    }
    const addSectionsEnabled = sections.length <= MAX_SECTIONS
    const addSectionClasses = addSectionsEnabled
      ? 'btn-gold'
      : 'btn-disabled'
    return (
      <div className={styles.cvEdit + ' ' + styles.cv}>
        <div>
          { header }
          { sections.map((s, i) => this.renderSection(s, i)) }
          <div className={styles.addSection}>
            <button
              className={addSectionClasses}
              onClick={this.props.addSection}
              disabled={!addSectionsEnabled} >
              Add Section
            </button>
          </div>
        </div>
        <div className={styles.saveStatus}>
          { saveStatus }
        </div>
      </div>
    )
  }
}

CvEdit.propTypes = {
  saved: PropTypes.bool.isRequired,
  saveErr: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  addSection: PropTypes.func.isRequired,
  getCv: PropTypes.func.isRequired,
  saveCv: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  updateSection: PropTypes.func.isRequired,
  removeSection: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    content: state.getIn(['cv', 'content']),
    fetchedCv: state.getIn(['cv', 'cv', 'fetchedCv']),
    user: state.getIn(['global', 'user']),
    saved: state.getIn(['cv', 'saved']),
    saving: state.getIn(['cv', 'saving']),
    saveErr: state.getIn(['cv', 'saveError']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CvEdit)
