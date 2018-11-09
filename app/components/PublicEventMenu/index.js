import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'

import styles from './styles.css'

const PublicEventMenu = ({ events }) => {
  return (
    <div className={styles.publicEventMenu}>
      <h2>Events</h2>
      <div className={styles.links}>
        {events.map(e => (
          <PublicEventMenuLink key={e.companyName} company={e.companyName} />
        ))}
      </div>
    </div>
  )
}

const PublicEventMenuLink = ({ company }) => {
  return (
    <Link
      activeClass={styles.active}
      key={company}
      to={company}
      smooth={true}
      offset={-92}
      duration={400}
      spy={true}
    >
      {company}
    </Link>
  )
}

PublicEventMenu.propTypes = {
  events: PropTypes.array.isRequired,
}

PublicEventMenuLink.propTypes = {
  company: PropTypes.string,
}

export default PublicEventMenu
