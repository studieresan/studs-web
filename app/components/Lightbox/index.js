import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Button from 'components/Button'

class Lightbox extends Component {
  constructor(props) {
    super(props)
  }

  clickBackgroundToClose = e => {
    if (e.target.className === styles.lightbox) {
      this.props.toggleLightbox()
    }
  }

  render() {
    return (
      <div
        className={styles.lightbox}
        onClick={e => {
          this.clickBackgroundToClose(e)
        }}
      >
        <Button
          type='button'
          className={styles.close}
          onClick={() => this.props.toggleLightbox()}
        >
          <span>X</span>
        </Button>
        {this.props.children}
      </div>
    )
  }
}

Lightbox.propTypes = {
  children: PropTypes.object.isRequired,
  toggleLightbox: PropTypes.func.isRequired,
}

export default Lightbox
