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

export const postEventQuestions = [
  {
    title: 'How did the event impact your opinion about the company?',
    type: 'choice',
    labels: [
      'The event had a positve impact on my view of the company.',
      "It didn't change my view of the company.",
      'The event had a negative impact on my view of the company.',
    ],
    name: 'eventImpact',
  },
  {
    title: 'How interested in working at this company are you now?',
    type: 'scale',
    labels: ['Not interested at all.', 'Very interested.'],
    name: 'interestedInWorkingRating',
  },
  {
    title:
      "How interested in writing your master's thesis at this company are you now?",
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
    name: 'interestInCompany',
  },
  {
    title: 'Do you feel qualified to work at this company?',
    type: 'choice',
    labels: ['Yes, I do.', "No, I don't"],
    name: 'qualifiedToWork',
  },
  {
    title: 'How did you experience the atmosphere at the event?',
    type: 'scale',
    labels: ['Not at all pleasant.', 'Very pleasant.'],
    name: 'atmosphereRating',
  },
  {
    title: 'Did you enjoy the activities at the event?',
    type: 'scale',
    labels: ['Not at all.', 'Very much so.'],
    name: 'activitiesRating',
  },
  {
    title: 'Did you like the food at the event?',
    type: 'scale',
    labels: ['Not at all.', 'Very much so.'],
    name: 'foodRating',
  },
  {
    title: 'What did you enjoy the most about the event and the company? ',
    type: 'response',
    name: 'feedback',
  },
  {
    title: 'What could have been improved?',
    type: 'response',
    name: 'improvements',
  },
]
