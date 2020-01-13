import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import { trackEvent } from '../../utils'
import CloseIcon from 'static/img_new/icons/icon_close.svg'

import styles from './styles.css'

const PublicEventMenu = ({ events, oldEvents }) => {
  const [menuOpen, setMenuOpen] = useState(true)

  return (
    <div
      onClick={() => !menuOpen && setMenuOpen(true)}
      className={
        styles.public_event_menu + ' ' + (!menuOpen && styles.collapsed)
      }
    >
      <div onClick={() => setMenuOpen(false)} className={styles.close}>
        <img src={CloseIcon} />
      </div>
      <span>Events 19/20</span>
      <div className={styles.links}>
        {events.map(e => (
          <PublicEventMenuLink
            onTouch={() => setMenuOpen(false)}
            key={e.companyName}
            company={e.companyName}
          />
        ))}
      </div>
      <span>Previous Events</span>
      <div className={styles.links}>
        {oldEvents.map(e => (
          <PublicEventMenuLink
            onTouch={() => setMenuOpen(false)}
            key={e.companyName}
            company={e.companyName}
          />
        ))}
      </div>
    </div>
  )
}

const PublicEventMenuLink = ({ company, onTouch }) => {
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
        onClick={e => {
          trackEvent('Events', `Clicked the ${company} event`)
          e.nativeEvent.sourceCapabilities.firesTouchEvents && onTouch()
        }}
      >
        <span>{'>'}</span>
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
  onTouch: PropTypes.func,
}

export default PublicEventMenu
