/* eslint quotes: 0 max-len: 0*/

export const preEventQuestions = [
  {
    title: 'Are you familiar with the company and what they do?',
    type: 'choice',
    labels: ['Yes.', 'To some extent.', 'No.'],
    name: 'familiarWithCompany',
  },
  {
    title: 'How interested in working at this company are you?',
    type: 'scale',
    labels: ['Not interested at all.', 'Very interested.'],
    name: 'interestedInWorkingRating',
  },
  {
    title:
      "How interested in writing your master's thesis at this company are you?",
    type: 'scale',
    labels: ['Not interested at all.', 'Very interested.'],
    name: 'interestedInThesisWorkRating',
  },
  {
    title: "Are you looking for a company to do your master's thesis at?",
    type: 'choice',
    labels: ['Yes, I am.', 'No, I am not.'],
    name: 'willWriteThesis',
  },
  {
    title:
      "Please motivate why you are or aren't interested in working at this company.",
    type: 'response',
    name: 'interestMotivation',
  },
  {
    title:
      "How would you describe your view of the company and what's your general opinion about them?",
    type: 'response',
    name: 'viewOfCompany',
  },
]

export const postEventQuestions = []
