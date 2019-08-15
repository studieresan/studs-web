// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import Logo from 'static/img/logo/studs20.svg'
import Button from 'components/Button'

function HomePageHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <img className={styles.logo} src={Logo} />
        <div className={styles.header_text}>
          <h3>
            Välkommen till Studs - KTH Datatekniks plattform för att få företag
            att interagera med snart examinerade studenter.
          </h3>
        </div>
        <div className={styles.buttons}>
          <Button color='default'>Ansök</Button>
          <Button color='default'>Läs mer</Button>
        </div>
      </div>
    </div>
  )
}

export default HomePageHeader
