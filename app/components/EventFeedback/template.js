const colors = ['#92C7A0', 'black', '#E57C62', '#303B4B', '#F7CDD2']

const data1 = {
  title: 'How did the event affect your opinion/view of the company?',
  labels: ['More Positive', 'Did Not Change', 'Negative'],
  datasets: [
    {
      borderColor: 'black',
      backgroundColor: colors,
      data: [3, 2, 1],
    },
  ],
}

const data2 = {
  title: 'How interested are you in writing your Master\'s thesis/working at this company?',
  labels: ['Interested', 'Neutral', 'Not Interested'],
  datasets: [
    {
      borderColor: 'black',
      backgroundColor: colors,
      data: [3, 2, 1],
    },
  ],
}

const data3 = {
  title: 'Do you feel like you are qualified to work at this company?',
  labels: ['Yes', 'No'],
  datasets: [
    {
      borderColor: 'black',
      backgroundColor: colors,
      data: [50, 50],
    },
  ],
}

const data4 = {
  title: 'How was the atmosphere at the event?',
  labels: ['Good', 'Neutral', 'Bad'],
  datasets: [
    {
      borderColor: 'black',
      backgroundColor: colors,
      data: [3, 2, 1],
    },
  ],
}

const data5 = {
  title: 'What did you think about the activities at the event?',
  labels: ['Good', 'Neutral', 'Bad'],
  datasets: [
    {
      borderColor: 'black',
      backgroundColor: colors,
      data: [3, 2, 1],
    },
  ],
}

const data6 = {
  title: 'How was the food at the event?',
  labels: ['Good', 'Neutral', 'Bad'],
  datasets: [
    {
      borderColor: 'black',
      backgroundColor: colors,
      data: [3, 2, 1],
    },
  ],
}

export const responses1 = {
  question: 'If you are not interested in working at the company, why is that?',
  responses:
  [
    'Hello, feedback.',
  ],
}

export const responses2 = {
  question: 'What did you enjoy the most about the event and company?',
  responses:
  [
    'Hello, feedback.',
  ],
}

export const responses3 = {
  question: 'What could be improved?',
  responses:
  [
    'Hello, feedback.',
  ],
}

export const datasets = [data1, data2, data3, data4, data5, data6]
export const responses = [responses1, responses2, responses3]
