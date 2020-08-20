import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import { trackEvent } from '../../utils'
import CloseIcon from 'static/img/icons/icon_close.svg'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Bowser from 'bowser'
import styles from './styles.css'

const PublicEventMenu = ({ events, oldEvents }) => {
  const browser = Bowser.getParser(window.navigator.userAgent)
  const [menuOpen, setMenuOpen] = useState(
    browser.getPlatformType() !== 'mobile'
  )

  return (
    <div
      onClick={() => !menuOpen && setMenuOpen(true)}
      className={
        styles.public_event_menu + ' ' + (!menuOpen && styles.collapsed)
      }
    >
      <img
        onClick={() => setMenuOpen(false)}
        src={CloseIcon}
        className={styles.close}
      />
      <span>
        <FormattedMessage {...messages.current} />
      </span>
      <div className={styles.links}>
        {events.map(e => (
          <PublicEventMenuLink
            onTouch={() => setMenuOpen(false)}
            key={e.id}
            company={e.companyName}
            companyId={e.id}
          />
        ))}
      </div>
      <span>
        <FormattedMessage {...messages.previous} />
      </span>
      <div className={styles.links}>
        {oldEvents.map(e => (
          <PublicEventMenuLink
            onTouch={() => setMenuOpen(false)}
            key={e.id}
            company={e.companyName}
            companyId={e.id}
          />
        ))}
      </div>
    </div>
  )
}

const PublicEventMenuLink = ({ company, companyId, onTouch }) => {
  return (
    <div>
      <Link
        activeClass={styles.active}
        to={companyId}
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
  companyId: PropTypes.string,
  onTouch: PropTypes.func,
}

export default PublicEventMenu
