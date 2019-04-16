/* eslint quotes: 0 max-len: 0*/
// @flow

export type Question = {|
  title: string,
  labels?: string[],
  type?: 'response' | '5scale' | 'interestScale' | 'posNegScale' | null,
  optional?: boolean,
  name?: string,
  answers?: Object,

  // responses if type is 'response', otherwise datasets
  responses?: Array<string>,
  datasets?: Array<{
    data: Array<any>,
    backgroundColor?: Array<string>,
  }>,
|}

const oneToFive = ['1', '2', '3', '4', '5']

// The types have 1-5 scales in the actual form, but will later
// be converted to another type in the feedback PDF

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

const backgroundColor = ['#a9e0f2', '#1d6598', '#0f344e']

const template: Question[] = [
  {
    title: 'Pre Event: Are you familiar with the company and what they do?',
    labels: ['Yes', 'To some extent', 'No'],
    name: 'familiarWithCompany',
  },
  {
    title: 'Pre Event: How interested in working at this company are you?',
    ...interestScale,
    name: 'interestInRegularWorkBefore',
  },
  {
    title:
      "Pre Event: How interested in writing your master's thesis at this company are you?",
    ...interestScale,
    optional: true,
  },
  {
    title:
      "Pre Event: Are you looking for a company to do your master's thesis at?",
    labels: ['Yes, I am', 'No, I am not'],
    optional: true,
  },
  {
    title:
      "Pre Event: Please motivate why you are or aren't interested in working at this company.",
    type: 'response',
    name: 'interestInCompanyMotivationBefore',
  },
  {
    title:
      "Pre Event: How would you describe your view of the company and what's your general opinion about them?",
    type: 'response',
    name: 'viewOfCompany',
  },
  {
    title: 'How did the event impact your opinion about the company?',
    labels: ['Positive impact', 'No change', 'Negative impact'],
    name: 'eventImpact',
  },
  {
    title: 'How interested in working at this company are you now?',
    ...interestScale,
    name: 'interestInRegularWork',
  },
  {
    title:
      "How interested in writing your master's thesis at this company are you now?",
    ...interestScale,
    optional: true,
  },
  {
    title: "Are you looking for a company to do your master's thesis at?",
    labels: ['Yes, I am', 'No, I am not'],
    optional: true,
  },
  {
    title:
      "Please motivate why you are or aren't interested in working at this company.",
    type: 'response',
    name: 'interestInCompanyMotivation',
  },
  {
    title: 'Do you feel qualified to work at this company?',
    labels: ['Yes, I do', "No, I don't"],
    name: 'qualifiedToWork',
  },
  {
    title: 'How did you experience the atmosphere at the event?',
    ...posNegScale,
    name: 'atmosphereRating',
  },
  {
    title: 'Did you enjoy the activities at the event?',
    ...oneToFiveScale,
    name: 'activitiesRating',
  },
  {
    title: 'Did you like the food at the event?',
    ...oneToFiveScale,
    name: 'foodRating',
  },
  {
    title: 'What did you enjoy the most about the event and the company?',
    type: 'response',
    name: 'eventFeedback',
  },
  {
    title: 'What could have been improved?',
    type: 'response',
    name: 'eventImprovements',
  },
]

function scaleToYesNo(scaleData: Array<string> = []) {
  let yes = 0
  let no = 0
  scaleData.forEach((amount, index) => {
    if (index + 1 >= 3) {
      yes += parseInt(amount)
    } else {
      no += parseInt(amount)
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
      pos += parseInt(amount)
    } else if (index + 1 <= 2) {
      neg += parseInt(amount)
    } else {
      neutral += parseInt(amount)
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
export function addResponses(formData: Object): Array<Question> {
  return [...template].map(question => {
    if (question.type === 'response') {
      return {
        ...question,
        responses: formData[question.title]
          .split('\n')
          .filter(txt => txt.length > 0), // filter out empty lines
      }
    }

    // if question is optional with no responses, don't add the `datasets` property
    if (question.optional && !formData[question.title]) {
      return { ...question }
    }

    return {
      ...question,
      datasets: [
        {
          data: formData[question.title],
        },
      ],
    }
  })
}

/**
 * This function takes an array of questions and simplifies it:
 * Questions that have 1-5 scales are converted to
 * "positive", "neutral", "negative" style instead.
 *
 * @param {Array<Question>} responses
 */
export function formatResponses(responses: Array<Question>): Array<Question> {
  console.log('responses:', responses)
  return responses
    .filter((question: Question) => {
      // filter out optional questions without responses
      if (question.optional && !question.datasets) return false
      return true
    })
    .map(question => {
      if (question.type === 'response') {
        return {
          ...question,
        }
      }

      let data = question.datasets && question.datasets[0].data
      let labels

      // The form contains many 1-5 scales, but we want to simplify them
      switch (question.type) {
        case '5scale':
          labels = ['Yes', 'No']
          data = scaleToYesNo(data)
          break
        case 'interestScale':
          labels = ['Interested', 'Neutral', 'Not interested']
          data = scaleToPosNeg(data)
          break
        case 'posNegScale':
          labels = ['Positive', 'Neutral', 'Negative']
          data = scaleToPosNeg(data)
          break
        default:
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
            data: data || [],
            backgroundColor,
          },
        ],
      }
    })
}

export default template
