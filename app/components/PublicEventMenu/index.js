import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-scroll'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'

const PublicEventMenu = ({ events }) => {
  return (
    <aside className={styles.public_event_menu}>
      <span>
        <FormattedMessage {...messages.current} />
      </span>
      <div className={styles.links}>
        {events.map(e => (
          <PublicEventMenuLink
            key={e.id}
            company={e.companyName}
            companyId={e.id}
          />
        ))}
      </div>
    </aside>
  )
}

const PublicEventMenuLink = ({ company, companyId }) => {
  return (
    <div>
      <Link
        activeClass={styles.active}
        to={companyId}
        smooth={true}
        duration={400}
        spy={true}
      >
        <span>{'>'}</span>
        {company}
      </Link>
    </div>
  )
}

PublicEventMenu.propTypes = {
  events: PropTypes.array.isRequired,
}

PublicEventMenuLink.propTypes = {
  company: PropTypes.string,
  companyId: PropTypes.string,
  onTouch: PropTypes.func,
}

export default PublicEventMenu
