import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

const CompanyAmountInput = ({ currentAmount, updateAmount }) => {
  const [amount, setAmount] = useState(currentAmount)
  const [firstTime, setNotFirstTime] = useState(true)
  const debouncedUpdateAmount = useDebounce(amount, 1000)

  useEffect(
    () => {
      if (firstTime) {
        //This is called on-load
        setNotFirstTime(false)
      } else {
        updateAmount(debouncedUpdateAmount)
      }
    },
    [debouncedUpdateAmount] // Only call effect if debounced amount changes
  )

  return (
    <div className={styles.select_input}>
      <label>Belopp</label>
      <input
        type='number'
        value={amount}
        onChange={event => setAmount(event.target.value)}
      />
    </div>
  )
}

CompanyAmountInput.propTypes = {
  currentAmount: PropTypes.number.isRequired,
  updateAmount: PropTypes.func.isRequired,
}

// Hook from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

export default CompanyAmountInput
