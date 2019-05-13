// @flow
import React, { useEffect, useState } from 'react'
import { fetchPeopleMissingFeedback } from '../../api'
import styles from './styles.css'

type Person = {
  profile: {
    firstName: string,
    lastName: string,
  },
}

type MissingPeopleFeedback = {
  missingPreEventFormUsers: Person[],
  missingPostEventFormUsers: Person[],
}

type Props = {
  +eventId: string,
}

// helper function to combine first and last name
const firstAndLastName = (p: Person) =>
  p.profile.firstName + ' ' + p.profile.lastName

function sortPeopleByName(people: Person[]): Person[] {
  return people.sort((a: Person, b: Person) => {
    const aName = firstAndLastName(a)
    const bName = firstAndLastName(b)
    if (aName < bName) return -1
    if (aName > bName) return 1
    return 0
  })
}

function MissingPeople({ eventId }: Props) {
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const [missingFeedback, setMissingFeedback] = useState({
    missingPreEventFormUsers: [],
    missingPostEventFormUsers: [],
  })

  useEffect(
    () => {
      fetchPeopleMissingFeedback(eventId).then(data => {
        setMissingFeedback(data)
        setHasFetchedData(true)
      })
    },
    [eventId]
  )

  // cast missingFeedback to the correct type, not sure if there is a way
  // to make Flow able to infer it directly from the useState call
  const data = (missingFeedback: MissingPeopleFeedback)

  const sortedPreEventPeople = sortPeopleByName(data.missingPreEventFormUsers)
  const sortedPostEventPeople = sortPeopleByName(data.missingPostEventFormUsers)

  const shouldShow =
    hasFetchedData &&
    (sortedPreEventPeople.length > 0 || sortedPostEventPeople.length > 0)

  if (!shouldShow) return null

  return (
    <div className={styles.missingPeople}>
      <h2>Missing feedback:</h2>
      <div className={styles.listsContainer}>
        <div>
          <h3>Pre event:</h3>
          <ul>
            {sortedPreEventPeople.map(person => (
              <li key={firstAndLastName(person)}>{firstAndLastName(person)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Post event:</h3>
          <ul>
            {sortedPostEventPeople.map(person => (
              <li key={firstAndLastName(person)}>{firstAndLastName(person)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MissingPeople
