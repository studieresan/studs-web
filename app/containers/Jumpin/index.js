import React, { Component } from 'react'
import styles from './styles.css'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeo8MkVw6fHzW_EB2rBfD1MyXzOqxYvKjQSXmX8at0LLiQ_9w/viewform'

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
