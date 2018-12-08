// @flow
import React, { Fragment } from 'react'
import type { Question } from './template'
import styles from './styles.css'

function Fieldset({ title, labels, type, datasets, responses }: Question) {
  let content
  if (type && type === 'response') {
    let defaultValue
    if (responses && responses.length > 0) {
      defaultValue = responses.join('\n')
    }
    content = (
      <Fragment>
        <label>
          <span>Put each comment on its own line</span>
          <textarea name={title} required defaultValue={defaultValue} />
        </label>
      </Fragment>
    )
  } else {
    let defaultValues
    if (datasets && datasets.length > 0) {
      defaultValues = datasets[0].data
    }
    content = (
      <div className={styles.inputGroup}>
        {labels &&
          labels.map((label, i) => (
            <Fragment key={label}>
              <label>
                {label}
                <input
                  type='number'
                  name={title}
                  defaultValue={defaultValues && defaultValues[i]}
                  required
                />
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
