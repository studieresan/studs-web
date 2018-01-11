import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'

import styles from './styles.css'

const PublicEventMenu = ({ events }) => {
  return (
    <div className={styles.publicEventMenu}>
      <h2>Events</h2>
      <div className={styles.links}>
        { events.map(e => (
          <Link
            activeClass={styles.active}
            key={e.companyName}
            to={e.companyName}
            smooth={true}
            offset={-92}
            duration={400}
            spy={true}
          >
            {e.companyName}
          </Link>
        ))}
      </div>
    </div>
  )
}

PublicEventMenu.propTypes = {
  events: PropTypes.array.isRequired,
}

export default PublicEventMenu
