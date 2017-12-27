import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import TextArea from 'react-textarea-autosize'
import CvHeader from '../../components/CvHeader'
import { ChevronDown, ChevronUp, X, Plus, Loader } from 'react-feather'
import Button from 'components/Button'

const styles = {}
import cvStyles from '../../components/Cv/styles.css'
import ownStyles from './styles.css'
Object.assign(styles, cvStyles, ownStyles)

const SMALL_FIELD_MAX_LENGTH = 100
const LARGE_FIELD_MAX_LENGTH = 1000
const MAX_SECTIONS = 8
const MAX_ITEMS = 15
const CONFIRM_DELETE_SECTION_MESSAGE =
  'Are you sure you want to delete this entire section?'
const CONFIRM_DELETE_ITEM_MESSAGE =
  'Are you sure you want to delete this item?'

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
    if (!confirm(CONFIRM_DELETE_SECTION_MESSAGE)) return
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
    if (!confirm(CONFIRM_DELETE_ITEM_MESSAGE)) return
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
            <Button
              color='icon'
              className={moveUpDisabled && styles.arrowDisabled}
              disabled={moveUpDisabled}
              onClick={() =>
                this.onMoveItemClick(item, sectionIndex, index, index - 1)}>
              <ChevronUp/>
            </Button>
            <Button
              color='icon'
              className={moveDownDisabled && styles.arrowDisabled}
              disabled={moveDownDisabled}
              onClick={() =>
                this.onMoveItemClick(item, sectionIndex, index, index + 1)}>
              <ChevronDown/>
            </Button>
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
            minRows={3}
            onChange={this.onItemChange.bind(null, sectionIndex, index)}
            maxLength={LARGE_FIELD_MAX_LENGTH}
          />
        </div>
        <div className={styles.removeItem}>
          <Button
            color='danger'
            className={styles.cvAction}
            onClick={this.onRemoveItemClick.bind(null, sectionIndex, index)}>
              <X />
          </Button>
        </div>
      </div>
    )
  }
  renderSection(section, index) {
    const items =
      section.items.map((item, i) => this.renderItem(item, index, i, section))
    const addItemEnabled = section.items.length < MAX_ITEMS
    return (
      <div key={index} className={styles.section}>
        <div className={styles.sectionHeader}>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={section.title}
            className={styles.sectionInput}
            onChange={this.onSectionChange.bind(null, index)}
            maxLength={SMALL_FIELD_MAX_LENGTH}/>
          <div className={styles.removeSection}>
            <Button
              color='danger'
              className={styles.cvAction}
              onClick={this.onRemoveSectionClick.bind(null, index)}>
              <X /> Section
            </Button>
          </div>
        </div>
        {items}
        <Button
          wrapper
          className={styles.addItem}
          onClick={this.onAddItemClick.bind(null, index)}
          disabled={!addItemEnabled}>
          <Plus /> Add Item
        </Button>
      </div>
    )
  }
  render() {
    if (!this.props.content.get('sections')) {
      // TODO Show better loading indicator
      return (<Loader color="black" />)
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
    return (
      <div className={styles.cvEdit + ' ' + styles.cv}>
        <div>
          { header }
          { sections.map((s, i) => this.renderSection(s, i)) }
          <div className={styles.addSection}>
            <Button
              color='bright'
              wrapper
              className={styles.cvAction}
              onClick={this.props.addSection}
              disabled={!addSectionsEnabled} >
              <Plus /> Add Section
            </Button>
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
