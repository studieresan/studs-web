import React, { useMemo } from 'react'
import { getPDFURL } from '../../api'
import styles from './styles.css'

const PDF = () => {
  const src = useMemo(() => getPDFURL(window.location.pathname), [
    window.location.pathname,
  ])
  return (
    <React.Fragment>
      <div className={styles.pdf_header} />
      <iframe className={styles.iframe} src={src} />
    </React.Fragment>
  )
}

export default PDF
