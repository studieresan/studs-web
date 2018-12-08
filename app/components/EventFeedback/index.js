// @flow
import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  formatResponses,
  type Question,
} from 'containers/CreateEventFeedback/template'
import styles from './styles.css'

const chartOptions = {
  legend: {
    position: 'bottom',
    labels: {
      usePointStyle: true,
    },
  },
}

type Props = {|
  +companyName: string,
  +questions: Array<Question>,
|}

function EventFeedback({ companyName, questions }: Props) {
  const formatted = formatResponses(questions)

  const section = (response, i) => (
    <div key={`section${i}`}>
      <h2>{response.title}</h2>
      <ul>
        {response.responses &&
          response.responses.map((r, j) => (
            <li key={`response${i},${j}`}>{r}</li>
          ))}
      </ul>
    </div>
  )

  const chart = (data, i) => (
    <div className={styles.chart} key={`chart${i}`}>
      <h3 className={styles.chartTitle}>{data.title}</h3>
      <Pie data={data} {...chartOptions} />
    </div>
  )

  return (
    <div className={styles.feedback}>
      <div className={styles.content}>
        <div className={styles.main}>
          <h1>{companyName}</h1>
          {formatted.filter(q => q.type === 'response').map(section)}
        </div>
        <div className={styles.sidebar}>
          <h2>Statistics</h2>
          {formatted.filter(q => !q.type).map(chart)}
        </div>
      </div>
    </div>
  )
}

export default EventFeedback
