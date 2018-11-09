const isValidElement = elem => elem.name && elem.value

// Only take into account text-like inputs and checked radios/checkboxes
const isValidValue = elem =>
  !['checkbox', 'radio'].includes(elem.type) || elem.checked

/**
 * Utility function for converting form data to an object.
 *
 * @param {HTMLFormControlsCollection} formElements
 */
function formToObject(formElements) {
  const formData = Array.from(formElements).reduce((data, elem) => {
    if (isValidElement(elem) && isValidValue(elem)) {
      let value
      if (elem.type === 'checkbox') {
        // if multiple values are checked, save them in an array
        value = [...data[elem.name], elem.value]
      } else {
        value = elem.value
      }

      return {
        ...data,
        [elem.name]: value,
      }
    }

    return data
  }, {})

  return formData
}

export default formToObject
