import React from 'react'
import { connect } from 'react-redux'
import { scrollSpy, Events, animateScroll } from 'react-scroll'

import styles from './styles.css'
import PublicEvent from '../../components/PublicEvent'
import PublicEventMenu from '../../components/PublicEventMenu'
import * as api from '../../api'

const data = [
  {
    companyName: 'TriOptima',
    publicDescription: 'TriOptima is a fintech company founded in Stockholm in 2000, now part of the NEX group. They specialize in post-trade risk management and performance optimization for OTC derivatives. They currently have offices in Stockholm, New York, London, Tokyo, and Singapore. One of their products, TriReduce, is the de facto standard in the financial market within compression of OTC derivative portfolios. Their headquarters are located in Stockholm, and as an international company, they offer employees many opportunities to work abroad.\n\n' +
    'When Studs arrived, we were first introduced to a talk on the company’s history, their business and area of expertise, and what working at TriOptima as a developer is like. Developers at TriOptima are encouraged to work in a programming environment of their own choice and to work closely with members of other teams in order to bring their customers the best products possible. The talk was followed by a tour of their newly finished office and a laid-back dinner with some of the company’s employees from different departments. We then got a chance to hang out and get to know them over a game of pool or darts, or just a casual beer in the office lounge. The event at the offices then concluded with a hot mug of glögg on their rooftop with a spectacular view of Stockholm.\n\n' +
    'As graduating students in computer science related fields, we were encouraged to reach out to TriOptima with our own suggestions for interesting collaborative projects. We felt that despite acting in a very complex business area and enjoying a very fast growth, TriOptima is a company which has maintained their sense of familiarity. Their efforts to provide a work environment that is encouraging and inclusive is something we at Studs value. After concluding the event with a trip by party bus to the TriOptima sponsored pub, we were left with the impression of working at TriOptima being both exciting and approachable.',
    pictures: [
      'https://www.hotelschool.co/wp-content/uploads/2017/08/Conference-and-Events-Management.png',
      'http://www.revelryeventdesigners.com/wp-content/uploads/2012/08/revelry-event-designers-homepage-slideshow-37.jpeg',
      'https://www.eventbriz.com/wp-content/uploads/2017/09/NOWLIVE.jpg',
    ],
  }, {
    companyName: 'Cygni',
    publicDescription: 'Cygni is an IT consulting company with an impressive list of awards and diplomas. They have been crowned the best workplace of both Sweden and Europe numerous times. At their office we were met with a rather unique talk, not about the company itself but about what is important when looking for that first job after graduation. After the talk we got the chance to speed date the employees at Cygni, giving us a great opportunity to ask whatever question we might come up with.',
    pictures: [
      'https://www.hotelschool.co/wp-content/uploads/2017/08/Conference-and-Events-Management.png',
      'http://www.revelryeventdesigners.com/wp-content/uploads/2012/08/revelry-event-designers-homepage-slideshow-37.jpeg',
      'https://www.eventbriz.com/wp-content/uploads/2017/09/NOWLIVE.jpg',
    ],
  },
]

export class PublicEvents extends React.Component {
  constructor(props) {
    super(props)
    this.state = { events: [] }
  }

  componentDidMount() {
    // api.fetchEvents().then(data => {
    this.setState({
      // events: data.events.filter(e => (!!e.public_text && !!e.picture_1)),
      events: data,
    })
    // }).catch(console.log)

    Events.scrollEvent.register('begin')
    Events.scrollEvent.register('end')

    scrollSpy.update()
    animateScroll.scrollTo(1)
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  render() {
    const { events } = this.state

    return (
      <div className={styles.publicEvents}>
        <PublicEventMenu events={events} />
        { events.map(e => <PublicEvent key={e.id} {...e} />)}
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(null, mapDispatchToProps)(PublicEvents)
