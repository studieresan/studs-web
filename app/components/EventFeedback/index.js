// @flow
import React from 'react'
import { Pie } from 'react-chartjs-2'
import moment from 'moment'
import styles from './styles.css'
const COMPANY_NAME = 'COMPANY NAME'

const props = {
  legend: {
    position: 'bottom',
    labels: {
      usePointStyle: true,
    },
  },
}

type Props = {|
  +questions: Array<Object>,
|}

function EventFeedback({ questions }: Props) {
  const section = (response, i) => (
    <div key={`section${i}`}>
      <h2>{response.title}</h2>
      <ul>
        {response.responses.map((r, j) => (
          <li key={`response${i},${j}`} className={styles.bullet}>
            {r}
          </li>
        ))}
      </ul>
    </div>
  )
  const chart = (data, i) => (
    <div className={styles.chart} key={`chart${i}`}>
      <h3 className={styles.chartTitle}>{data.title}</h3>
      <Pie data={data} {...props} />
    </div>
  )
  return (
    <div className={styles.feedback}>
      <div className={styles.header}>
        <div className={styles.sidebar}>
          <h6>{moment().format('YYYY-MM-DD')}</h6>
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
          {questions.filter(q => !q.type).map(chart)}
        </div>
        <div className={styles.main}>
          <h1>{COMPANY_NAME}</h1>
          {questions.filter(q => q.type === 'response').map(section)}
        </div>
      </div>
    </div>
  )
}

export default EventFeedback
