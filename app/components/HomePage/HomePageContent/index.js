import React from 'react'
import messages from './messages'
import styles from './styles.css'
import HomePageHeader from 'components/HomePage/HomePageHeader'
import SalesContact from 'components/SalesContact'
import Card from './Card'
import cinno from 'static/img_new/home/cinnober.jpg'
import newYork from 'static/img_new/home/newyork.jpg'
import proj from 'static/img_new/home/project-1.jpg'

const HomePageContent = () => {
  return (
    <div className={styles.content}>
      <HomePageHeader />
      <Card
        title={messages.project.title}
        body={messages.project.body}
        images={[cinno, newYork, proj]}
      />
      <Card
        title={messages.events.title}
        body={messages.events.body}
        images={[]}
      />
      <SalesContact className={styles.sales_contact} />
    </div>
  )
}

export default HomePageContent
