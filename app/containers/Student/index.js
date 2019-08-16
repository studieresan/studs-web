import React, { Component } from 'react'
import styles from './styles.css'
import Footer from 'components/Footer'
import { FormattedMessage } from 'react-intl'
import { StudentComponent } from 'components/Student/index'

class Student extends Component {
  render() {
    return (
      <div className='container'>
        <div className={styles.student}>
          <StudentComponent />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Student
