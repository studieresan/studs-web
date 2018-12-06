/* eslint quotes: 0 max-len: 0*/
// @flow

type Question = {|
  title: string,
  labels?: string[],
  type?: 'response' | '5scale' | 'interestScale' | 'posNegScale',
|}

const oneToFive = ['1', '2', '3', '4', '5']

const oneToFiveScale = {
  labels: oneToFive,
  type: '5scale',
}

const interestScale = {
  labels: oneToFive,
  type: 'interestScale',
}

const posNegScale = {
  labels: oneToFive,
  type: 'posNegScale',
}

const template: Question[] = [
  {
    title: 'How did the event impact your opinion about the company?',
    labels: ['Positive impact', 'No change', 'Negative impact'],
  },
  {
    title: 'How interested in working at this company are you now?',
    ...interestScale,
  },
  {
    title:
      "How interested in writing your master's thesis at this company are you now?",
    ...interestScale,
  },
  {
    title: "Are you looking for a company to do your master's thesis at?",
    labels: ['Yes, I am', 'No, I am not'],
  },
  {
    title:
      "Please motivate why you are or aren't interested in working at this company.",
    type: 'response',
  },
  {
    title: 'Do you feel qualified to work at this company?',
    labels: ['Yes, I do', "No, I don't"],
  },
  {
    title: 'How did you experience the atmosphere at the event?',
    ...posNegScale,
  },
  {
    title: 'Did you enjoy the activities at the event?',
    ...oneToFiveScale,
  },
  {
    title: 'Did you like the food at the event?',
    ...oneToFiveScale,
  },
  {
    title: 'What did you enjoy the most about the event and the company?',
    type: 'response',
  },
  {
    title: 'What could have been improved?',
    type: 'response',
  },
]

function scaleToYesNo(scaleData: Array<string> = []) {
  let yes = 0
  let no = 0
  scaleData.forEach((amount, index) => {
    if (index + 1 >= 3) {
      yes += Number.parseInt(amount, 10)
    } else {
      no += Number.parseInt(amount, 10)
    }
  })
  return [yes, no]
}

// Used both for posNegScale and interestScale
function scaleToPosNeg(scaleData: Array<string> = []) {
  let pos = 0
  let neutral = 0
  let neg = 0
  scaleData.forEach((amount, index) => {
    if (index + 1 >= 4) {
      pos += Number.parseInt(amount, 10)
    } else if (index + 1 <= 2) {
      neg += Number.parseInt(amount, 10)
    } else {
      neutral += Number.parseInt(amount, 10)
    }
  })
  return [pos, neutral, neg]
}

/**
 * Takes form data from the event feedback form and inserts
 * them into the template.
 *
 * @param {Object} formData
 */
export function addResponses(formData: Object) {
  const data: Array<Object> = [...template].map(question => {
    if (question.type === 'response') {
      return {
        ...question,
        responses: formData[question.title].split('\n'),
      }
    }

    let data
    let labels

    // The form contains many 1-5 scales, but we want to simplify them
    switch (question.type) {
      case '5scale':
        labels = ['Yes', 'No']
        data = scaleToYesNo(formData[question.title])
        break
      case 'interestScale':
        labels = ['Interested', 'Neutral', 'Not interested']
        data = scaleToPosNeg(formData[question.title])
        break
      case 'posNegScale':
        labels = ['Positive', 'Neutral', 'Negative']
        data = scaleToPosNeg(formData[question.title])
        break
      default:
        data = formData[question.title]
        labels = question.labels
        break
    }

    // Strip the type property since ChartJS won't work if it's present.
    // Note that we still need to keep the 'response' type, since
    // that is used to determine whether to render a chart or a bullet list
    return {
      ...question,
      labels,
      type: null,
      datasets: [
        {
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    }
  })

  return data
}

export default template
