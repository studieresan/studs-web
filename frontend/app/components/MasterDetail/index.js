/**
*
* MasterDetail
*
*/

import React, { PropTypes } from 'react';

import styles from './styles.css';

class MasterDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    const width = window.innerWidth;
    this.setState({width});
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  static propTypes = {
    master: PropTypes.object.isRequired,
    detail: PropTypes.object.isRequired,
    detailSelected: PropTypes.bool.isRequired
  }

  renderMobile(props) {
    const { master, detail, detailSelected } = this.props;
    if(detailSelected) { 
      return detail;
    } else {
      return master;
    }
  }

  renderDesktop(props) {
    const { master, detail } = this.props;
    return (
      <div className={styles.masterDetail}>
        <div className={styles.master}>
          {master}
        </div>
        <div className={styles.detail}>
          {detail}
        </div>
      </div>
    );
  }

  render() {
    if(this.state.width < 600) {
      return this.renderMobile(this.props);
    } else {
      return this.renderDesktop(this.props);
    }
  }
}

export default MasterDetail;
