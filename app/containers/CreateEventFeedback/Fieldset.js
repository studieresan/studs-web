// @flow
import React, { Fragment, useState, useRef } from 'react'
import type { Question } from './template'
import styles from './styles.css'

function Fieldset({
  title,
  labels,
  type,
  datasets,
  responses,
  optional,
}: Question) {
  // Keep track of all input values in this field set.
  // Object keys: question title + index of the input
  // Object values: input value
  const [inputValues, setInputValues] = useState({})
  // `inputs.current` will be an object where each property is one of the
  // inputs in this component (after the initial render).
  const inputs = useRef({})

  // Go through all inputs in this field set and set their values in the
  // `inputValues` state so we know if this field set as a whole is
  // required or not. If we navigate back to /create-event-feedback after
  // generating a form, the values will be pre-filled, but `inputValues`
  // will initially be {}. In those situations, if one input is changed,
  // we still need to detect if the other inputs
  // (which are unchanged from the initial render, but still might have values)
  // actually do contain any values, and set `required` to the appropriate
  // value afterwards.
  const onInputChange = () => {
    const inputValues = {}
    // $FlowFixMe Flow thinks `input` is type mixed
    Object.values(inputs.current).forEach((input: HTMLInputElement, i) => {
      inputValues[input.name + i] = input.value
    })
    setInputValues(inputValues)
  }

  // If any input is filled in for a question, all inputs should be
  // filled (i.e., if you fill in a number for "Yes", must also fill in "No").
  const anyInputHasValue = Object.values(inputValues).some(
    // $FlowFixMe Flow thinks `value` has type mixed
    (value: string) => value.length > 0
  )

  let content
  if (type && type === 'response') {
    let defaultValue
    if (responses && responses.length > 0) {
      defaultValue = responses.join('\n\n\n')
    }

    // Setting the `key` prop is a hack that enables us to
    // set the `defaultValue` prop even after the initial render of
    // this component, since the responses won't be immediately available
    // when this component is mounted the first time.
    // Source:
    // https://github.com/mui-org/material-ui/issues/1328#issuecomment-198087347
    content = (
      <Fragment>
        <label>
          <span>Put each comment on its own line</span>
          <textarea
            name={title}
            required={!optional}
            key={defaultValue}
            defaultValue={defaultValue}
          />
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
                  min='0'
                  type='number'
                  name={title}
                  ref={ref => (inputs.current[title + i] = ref)}
                  required={!optional || anyInputHasValue}
                  onChange={onInputChange}
                  defaultValue={defaultValues && defaultValues[i]}
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
        <legend>
          {title} {optional && '(Optional)'}
        </legend>
      </h2>
      {content}
      {optional && (
        <div className={styles.optionalNote}>
          This field is optional; leave everything empty or fill in everything
        </div>
      )}
    </fieldset>
  )
}

export default Fieldset
