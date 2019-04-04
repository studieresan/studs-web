/* eslint quotes: 0 max-len: 0*/

export const preEventQuestions = [
  {
    title: 'Are you familiar with the company and what they do?',
    type: 'choice',
    labels: ['Yes.', 'To some extent.', 'No.'],
    labelValues: ['YES', 'SOMEWHAT', 'NO'],
    name: 'familiarWithCompany',
  },
  {
    title: 'How interested in working at this company are you?',
    type: 'scale',
    labels: ['Not interested at all.', 'Very interested.'],
    name: 'interestInRegularWork',
  },
  {
    title:
      "Please motivate why you are or aren't interested in working at this company.",
    type: 'response',
    name: 'interestInCompanyMotivation',
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
    labelValues: ['POSITIVE', 'NEUTRAL', 'NEGATIVE'],
    name: 'eventImpact',
  },
  {
    title: 'How interested in working at this company are you now?',
    type: 'scale',
    labels: ['Not interested at all.', 'Very interested.'],
    name: 'interestInRegularWork',
  },
  {
    title:
      "Please motivate why you are or aren't interested in working at this company.",
    type: 'response',
    name: 'interestInCompanyMotivation',
  },
  {
    title: 'Do you feel qualified to work at this company?',
    type: 'choice',
    labels: ['Yes, I do.', "No, I don't"],
    labelValues: [true, false],
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
    name: 'eventFeedback',
  },
  {
    title: 'What could have been improved?',
    type: 'response',
    name: 'eventImprovements',
  },
]
