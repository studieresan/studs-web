import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import { trackEvent } from '../../utils'

import styles from './styles.css'

const PublicEventMenu = ({ events, oldEvents }) => {
  return (
    <div className={styles.public_event_menu}>
      <span>Events 19/20</span>
      <div className={styles.links}>
        {events.map(e => (
          <PublicEventMenuLink key={e.companyName} company={e.companyName} />
        ))}
      </div>
      <span>Previous Events</span>
      <div className={styles.links}>
        {oldEvents.map(e => (
          <PublicEventMenuLink key={e.companyName} company={e.companyName} />
        ))}
      </div>
    </div>
  )
}

const PublicEventMenuLink = ({ company }) => {
  return (
    <div>
      <Link
        activeClass={styles.active}
        key={company}
        to={company}
        smooth={true}
        offset={-92}
        duration={400}
        spy={true}
        onClick={trackEvent('Events', `Clicked the ${company} event`)}
      >
        <icon>{'>'}</icon>
        {company}
      </Link>
    </div>
  )
}

PublicEventMenu.propTypes = {
  events: PropTypes.array.isRequired,
  oldEvents: PropTypes.array.isRequired,
}

PublicEventMenuLink.propTypes = {
  company: PropTypes.string,
}

export default PublicEventMenu
