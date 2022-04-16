import React, { Component } from 'react'
import styles from './styles.css'
import { ApplicationComponent } from '../../components/Application/index'

class Application extends Component {
  render() {
    return (
      <div className='container'>
        <div className={styles.application}>
          <ApplicationComponent />
        </div>
      </div>
    )
  }
}

export default Application
