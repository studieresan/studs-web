import React, { useState, createRef } from 'react'
import messages from './messages'
import styles from './styles.css'
import HomePageHeader from 'components/HomePage/HomePageHeader'
import SalesContact from 'components/SalesContact'
import ScrollSticky from 'components/ScrollSticky'
import Button from 'components/Button'
import MemberImage from 'components/MemberImage'
import Card from './Card'
import ImageEvent1 from 'static/img/home/event1.jpg'
import ImageEvent2 from 'static/img/home/event2.jpg'
import ImageEvent3 from 'static/img/home/event3.jpg'
import ImageProject1 from 'static/img/home/project1.jpg'
import ImageProject2 from 'static/img/home/project2.jpg'
import ImageProject3 from 'static/img/home/project3.jpg'
import sale from 'static/img/people/studs2022/julia.jpg'
import { FormattedMessage } from 'react-intl'

const HomePageContent = () => {
  const ref = createRef()
  const [showSalesPic, setshowSalesPic] = useState(true)

  return (
    <div className={styles.content}>
      <HomePageHeader />
      <ScrollSticky
        percentageFromTop={73}
        percentageFromRight={2}
        onStick={() => setshowSalesPic(false)}
        onUnStick={() => setshowSalesPic(true)}
        onClick={() => {
          ref.current && ref.current.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <div className={styles.contact_wrapper}>
          <div className={showSalesPic ? null : styles.squish_and_fade}>
            <MemberImage className={''} picture={sale} size={80} square round />
          </div>
          <Button color={'white'}>
            <FormattedMessage {...messages.contact} />
          </Button>
        </div>
      </ScrollSticky>
      <Card
        title={messages.project.title}
        body={messages.project.body}
        buttonText={messages.project.buttonText}
        images={[ImageProject1, ImageProject2, ImageProject3]}
        to={'/about'}
      />
      <Card
        title={messages.events.title}
        body={messages.events.body}
        buttonText={messages.events.buttonText}
        images={[ImageEvent1, ImageEvent2, ImageEvent3]}
        to={'/events/public'}
      />
      <div ref={ref} />
      <SalesContact className={styles.sales_contact} />
    </div>
  )
}

export default HomePageContent
