/*
 *
 * CvEdit
 *
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import * as actions from './actions';
import { getUser } from '../User/actions';
import TextArea from 'react-textarea-autosize';
import CvHeader from '../../components/CvHeader';

let styles = {};
import cvStyles from '../../components/Cv/styles.css';
import ownStyles from './styles.css';
Object.assign(styles, cvStyles, ownStyles);

export class CvEdit extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onSectionChange = this.onSectionChange.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onAddItemClick = this.onAddItemClick.bind(this);
    this.onRemoveItemClick = this.onRemoveItemClick.bind(this);
    this.onRemoveSectionClick = this.onRemoveSectionClick.bind(this);
  }
  componentDidMount() {
    this.props.getCv(this.props.params.id);
  }
  onSectionChange(index, event) {
    const { updateSection } = this.props;
    updateSection(index, {title: event.target.value});
    this.props.saveCv(this.props.params.id);
  }
  onRemoveSectionClick(index) {
    this.props.removeSection(index);
    this.props.saveCv(this.props.params.id);
  }
  onItemChange(section, index, event) {
    const { updateItem } = this.props;
    const item = {};
    item[event.target.name] = event.target.value;
    updateItem(section, index, item);
    this.props.saveCv(this.props.params.id);
  }
  onAddItemClick(section) {
    this.props.addItem(section);
    this.props.saveCv(this.props.params.id);
  }
  onRemoveItemClick(section, index) {
    this.props.removeItem(section, index);
    this.props.saveCv(this.props.params.id);
  }
  renderItem(item, sectionIndex, index) {
    return (
      <div key={index} className={`${styles.item} ${cvStyles.item}`}>
        <div className={styles.meta}>
          <div className={styles.when}>
            <TextArea
              name='when'
              placeholder='When'
              value={item.when}
              onChange={this.onItemChange.bind(null, sectionIndex, index)} />
          </div>
          <div className={styles.where}>
            <TextArea
              name='title'
              placeholder='Title'
              value={item.title}
              onChange={this.onItemChange.bind(null, sectionIndex, index)} />
            <TextArea
              name='organization'
              placeholder='Organization'
              value={item.organization}
              onChange={this.onItemChange.bind(null, sectionIndex, index)} />
            <TextArea
              name='city'
              placeholder='City'
              value={item.city}
              onChange={this.onItemChange.bind(null, sectionIndex, index)} />
          </div>
        </div>
        <div className={styles.description}>
          <TextArea
            name='description'
            placeholder='Description'
            value={item.description}
            onChange={this.onItemChange.bind(null, sectionIndex, index)} />
        </div>
        <div className={styles.remove} onClick={this.onRemoveItemClick.bind(null, sectionIndex, index)}>Remove</div>
      </div>
    );
  }
  renderSection(section, index) {
    const items = section.items.map((item, i) => this.renderItem(item, index, i));
    return (
      <div key={index} className={styles.section}>
        <input type='text' name='title' placeholder='Title' value={section.title} onChange={this.onSectionChange.bind(null, index)} />
        {items}
        <div className={styles.sectionActions}>
          <button className='btn-default' onClick={this.onRemoveSectionClick.bind(null, index)}>Remove Section</button>
          <button className='btn-bright' onClick={this.onAddItemClick.bind(null, index)}>Add Item</button>
        </div>
      </div>
    );
  }
  render() {
    const sections = this.props.content.get('sections').toJS();
    let header = null;
    if(this.props.user) {
      header = <CvHeader user={this.props.user.toJS()} />;
    }
    let saveStatus = null;
    if(this.props.saved) {
      saveStatus = "Saved";
    } else if(this.props.saving) {
      saveStatus = "Saving";
    } else if(this.props.saveErr) {
      saveStatus = "Error";
    }
    return (
      <div className={styles.cvEdit + ' ' + styles.cv}>
        <div>
          { header }
          { sections.map((s,i) => this.renderSection(s, i)) }
          <div className={styles.addSection}>
            <button className='btn-gold' onClick={this.props.addSection}>Add Section</button>
          </div>
        </div>
        <div className={styles.saveStatus}>
          { saveStatus }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    content: state.getIn(['cv', 'content']),
    fetchedCv: state.getIn(['cv', 'cv', 'fetchedCv']),
    user: state.getIn(['global', 'user']),
    saved: state.getIn(['cv', 'saved']),
    saving: state.getIn(['cv', 'saving']),
    saveErr: state.getIn(['cv', 'saveError']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CvEdit);
