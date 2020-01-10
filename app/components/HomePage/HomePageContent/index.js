import React, { useState, createRef } from 'react'
import messages from './messages'
import styles from './styles.css'
import HomePageHeader from 'components/HomePage/HomePageHeader'
import SalesContact from 'components/SalesContact'
import ScrollSticky from 'components/ScrollSticky'
import Button from 'components/Button'
import MemberImage from 'components/MemberImage'
import Card from './Card'
import cinno from 'static/img_new/home/cinnober.jpg'
import newYork from 'static/img_new/home/newyork.jpg'
import proj from 'static/img_new/home/project-1.jpg'
import cristian from 'static/img_new/people/cristian.jpg'
import { FormattedMessage } from 'react-intl'

const HomePageContent = () => {
  const ref = createRef()
  const [showSalesPic, setshowSalesPic] = useState(true)

  return (
    <div className={styles.content}>
      <HomePageHeader />
      <ScrollSticky
        percentageFromTop={81}
        percentageFromRight={2}
        onStick={() => setshowSalesPic(false)}
        onUnStick={() => setshowSalesPic(true)}
        onClick={() => {
          ref.current && ref.current.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <div className={styles.contact_wrapper}>
          <div className={showSalesPic ? null : styles.squish_and_fade}>
            <MemberImage
              className={''}
              picture={cristian}
              size={80}
              square
              round
            />
          </div>
          <Button color={'white'}>Contact us here!</Button>
        </div>
      </ScrollSticky>
      <Card
        title={messages.project.title}
        body={messages.project.body}
        images={[cinno, newYork, proj]}
      />
      <Card
        title={messages.events.title}
        body={messages.events.body}
        images={[cinno, newYork, proj]}
      />
      <div ref={ref} />
      <SalesContact className={styles.sales_contact} />
    </div>
  )
}

export default HomePageContent
