import React, { Component } from 'react'
import Iframe from 'react-iframe'
import styles from './styles.css'

export class ApplicationComponent extends Component {
  render() {
    return (
      <div className={styles.form_wrapper}>
        <Iframe
          url='https://docs.google.com/forms/d/e/1FAIpQLSeg5yrJPMYsHWZiAdq-ERhUhDTce8IKP4T7TupvD4U2v9vyZQ/viewform?embedded=true'
          width='100%'
          height='100%'
        />
      </div>
    )
  }
}
