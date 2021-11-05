import React, { Component } from 'react'
import styles from './styles.css'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfgTjrfi860_8aMh_6n8kiumcG42CWJ-lv8K4EXwPYM6YFpfg/viewform'

class Jumpin extends Component {
  componentDidMount() {
    document.location = FORM_URL
  }

  render() {
    return (
      <div className='container'>
        <div className={styles.jumpin}>
          <div>
            <a href={FORM_URL}>Sök här</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Jumpin
