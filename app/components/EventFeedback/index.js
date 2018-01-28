import React from 'react'
import classnames from 'classnames'
import { Pie } from 'react-chartjs-2'

import styles from './styles.css'

import { datasets, responses } from './template'
const COMPANY_NAME = 'COMPANY NAME'

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
      <Pie data={data} />
    </div>
  )
  return (
    <div className={classnames(styles.page, styles.col)}>
      <div className={classnames(styles.col, styles.colLeftBackground)}/>

      <div className={classnames(styles.header, styles.row)}>
        <div
          className={classnames(styles.col, styles.colLeft)}>
          <h6>2017-12-13</h6>
        </div>
        <div className={classnames(styles.col, styles.colRight)}>
          <h6>Event Feedback</h6>
        </div>
      </div>

      <div className={styles.dividerHolder}>
        <div className={styles.divider} />
      </div>

      <div className={classnames(styles.content, styles.row)}>
        <div className={classnames(styles.col, styles.colLeft)}>
          <h1>Statistics</h1>

          { datasets.map(chart) }

        </div>
        <div className={classnames(styles.col, styles.colRight)}>
          <h1>{ COMPANY_NAME }</h1>
          { responses.map(section) }
        </div>
      </div>
    </div>
  )
}

export default EventFeedback
