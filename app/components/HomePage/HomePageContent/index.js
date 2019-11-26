import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles.css'
import HomePageHeader from 'components/HomePage/HomePageHeader'

const Card = ({ title, body }) => {
  return <div className={styles.card}>card</div>
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

const HomePageContent = () => {
  return (
    <div className={styles.content}>
      <HomePageHeader />
      <Card title={'test1'} body={'body1'} />
      <Card title={'test2'} body={'body2'} />
    </div>
  )
}

export default HomePageContent
