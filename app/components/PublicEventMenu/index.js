import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import { trackEvent } from '../../utils'

import styles from './styles.css'

const PublicEventMenu = ({ title, events }) => {
  return (
    <div className={styles.publicEventMenu}>
      <h2>{title}</h2>
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
      onClick={trackEvent('Events', `Clicked the ${company} event`)}
    >
      {company}
    </Link>
  )
}

PublicEventMenu.propTypes = {
  title: PropTypes.string,
  events: PropTypes.array.isRequired,
}

PublicEventMenu.defaultProps = {
  title: 'Studs 2019',
}

PublicEventMenuLink.propTypes = {
  company: PropTypes.string,
}

export default PublicEventMenu
