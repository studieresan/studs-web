/* eslint quotes: 0 max-len: 0*/
// @flow

type Question = {|
  title: string,
  labels?: string[],
  type?: 'response' | '',
|}

const oneToFiveScale = ['1', '2', '3', '4', '5']

const template: Question[] = [
  {
    title: 'How did the event impact your opinion about the company?',
    labels: ['Positive impact', 'No change', 'Negative impact'],
  },
  {
    title: 'How interested in working at this company are you now?',
    labels: oneToFiveScale,
  },
  {
    title:
      "How interested in writing your master's thesis at this company are you now?",
    labels: oneToFiveScale,
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
    labels: oneToFiveScale,
  },
  {
    title: 'Did you enjoy the activities at the event?',
    labels: oneToFiveScale,
  },
  {
    title: 'Did you like the food at the event? ',
    labels: oneToFiveScale,
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

export default template
