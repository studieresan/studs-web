import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import HomePageHeader from 'components/HomePage/HomePageHeader'
import SalesContact from 'components/SalesContact'
import logo from 'static/img_new/logo/logomark-circle-white.png'

const Card = ({ title, body }) => {
  console.log(body)

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.title_container}>
          <img
            className={styles.logo}
            src={logo}
            alt=''
            width='50'
            height='50'
          />
          <h1>
            <FormattedMessage {...title} />
          </h1>
        </div>
        <div className={styles.body}>
          {Object.keys(body).map(k => (
            <h3 key={k} className={styles.paragraph}>
              <FormattedMessage {...body[k]} />
            </h3>
          ))}
        </div>
      </div>
      <div className={styles.slideshow}>
        <img src={logo} width={300} alt='' />
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

const HomePageContent = () => {
  return (
    <div className={styles.content}>
      <HomePageHeader />
      <Card title={messages.project.title} body={messages.project.body} />
      <Card title={messages.events.title} body={messages.events.body} />
      <SalesContact className={styles.sales_contact} />
    </div>
  )
}

export default HomePageContent
