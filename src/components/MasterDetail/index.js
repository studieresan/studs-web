import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'


class MasterDetail extends React.Component {
  constructor(props) {
    super(props)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions() {
    const width = window.innerWidth
    this.setState({width})
  }

  componentWillMount() {
    this.updateDimensions()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  renderMobile() {
    const { master, detail, detailSelected } = this.props
    if (detailSelected) {
      return detail
    } else {
      return master
    }
  }

  renderDesktop() {
    const { master, detail } = this.props
    return (
      <div className={styles.masterDetail}>
        <div className={styles.master}>
          {master}
        </div>
        <div className={styles.detail}>
          {detail}
        </div>
      </div>
    )
  }

  render() {
    if (this.state.width < 600) {
      return this.renderMobile()
    } else {
      return this.renderDesktop()
    }
  }
}

MasterDetail.propTypes = {
  master: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired,
  detailSelected: PropTypes.bool.isRequired,
}

export default MasterDetail
