import React from 'react'
import { Pie } from 'react-chartjs-2'
import styles from './styles.css'
import { datasets, responses } from './template'
const COMPANY_NAME = 'COMPANY NAME'

const props = {
  height: 100,
  options: {
    title: {
      fontFamily: 'Neuzeit S LT',
      fontColor: '#000',
    },
  },
  legend: {
    position: 'bottom',
    fullWidth: true,
    labels: {
      padding: 20,
      fontFamily: 'Neuzeit S LT',
      fontColor: '#000',
      usePointStyle: true,
    },
  },
}

const EventFeedback = () => {
  const section = (response, i) => (
    <div key={`section${i}`}>
      <h3>
        {response.question}
      </h3>
      <ul className={styles.bullets}>
        { response.responses.map((r, j) =>
          <li key={`response${i},${j}`} className={styles.bullet}>
            {r}
          </li>
        )
        }
      </ul>
    </div>
  )
  const chart = (data, i) => (
    <div className={styles.chart}
      key={`chart${i}`}>
      <h3 className={styles.chartTitle}>
        {data.title}
      </h3>
      <Pie data={data} {...props} />
    </div>
  )
  return (
    <div className={styles.feedback}>
      <div className={styles.header}>
        <div className={styles.sidebar}>
          <h6>2017-12-13</h6>
        </div>
        <div className={styles.container}>
          <h6>Event Feedback</h6>
        </div>
      </div>

      <div className={styles.dividerHolder}>
        <div className={styles.divider} />
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <h1>Statistics</h1>
          { datasets.map(chart) }
        </div>
        <div className={styles.main}>
          <h1>{ COMPANY_NAME }</h1>
          { responses.map(section) }
        </div>
      </div>
    </div>
  )
}

export default EventFeedback
