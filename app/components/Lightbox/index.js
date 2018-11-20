import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

class Lightbox extends Component {
  render() {
    return (
      <div className={styles.lightbox}>
        {this.props.children}
      </div>
    )
  }
}

Lightbox.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Lightbox