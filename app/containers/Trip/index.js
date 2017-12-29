import React from 'react'
import styles from './styles.css'

const JUICER_URL = 'https://www.juicer.io/' +
  'api/feeds/studs17/iframe?starting-at=2017-06-13&after=hello()'
export class Trip extends React.Component {
  render() {
    return (
      <div className={styles.trip}>
        <h1>The trip</h1>
        <iframe
          src={JUICER_URL}
          frameBorder='0'
        />
      </div>
    )
  }
}


export default Trip
