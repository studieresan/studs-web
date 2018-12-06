// @flow
import React, { Fragment } from 'react'
import styles from './styles.css'

type Question = {|
  title: string,
  labels?: string[],
  type?: 'response' | '',
|}

function Fieldset({ title, labels, type }: Question) {
  let content
  if (type && type === 'response') {
    content = (
      <Fragment>
        <label>
          <span>Put each comment on its own line</span>
          <textarea />
        </label>
      </Fragment>
    )
  } else {
    content = (
      <div className={styles.inputGroup}>
        {labels &&
          labels.map(label => (
            <Fragment key={label}>
              <label>
                {label}
                <input type='text' />
              </label>
            </Fragment>
          ))}
      </div>
    )
  }
  return (
    <fieldset>
      <h2>
        <legend>{title}</legend>
      </h2>
      {content}
    </fieldset>
  )
}

export default Fieldset
