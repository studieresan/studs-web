import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

import { useDebounce } from '../../utils'

const CompanyAmountInput = ({ currentAmount, updateAmount }) => {
  const [displayAmount, setDisplayAmount] = useState(currentAmount)
  const [amount, setAmount] = useState(currentAmount)
  const isFirstTime = useRef(true)
  const debouncedUpdateAmount = useDebounce(amount, 1000)

  useEffect(
    () => {
      if (isFirstTime.current) {
        //This is called on-load
        isFirstTime.current = false
      } else {
        updateAmount(debouncedUpdateAmount)
      }
    },
    [debouncedUpdateAmount] // Only call effect if debounced amount changes
  )

  useEffect(
    () => {
      setDisplayAmount(currentAmount)
    },
    [currentAmount]
  )

  return (
    <div className={styles.select_input}>
      <label>Belopp</label>
      <input
        type='number'
        value={displayAmount}
        onChange={event => {
          setAmount(event.target.value)
          setDisplayAmount(event.target.value)
        }}
      />
    </div>
  )
}

CompanyAmountInput.propTypes = {
  currentAmount: PropTypes.number.isRequired,
  updateAmount: PropTypes.func.isRequired,
}

export default CompanyAmountInput
