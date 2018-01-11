import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { scrollSpy, Events, animateScroll } from 'react-scroll'

import styles from './styles.css'
import PublicEvent from 'components/PublicEvent'
import PublicEventMenu from 'components/PublicEventMenu'

const data = [
  {
    companyName: 'TriOptima',
    date: '6 Dec 2017',
    adress: 'Mäster Samuelsgatan 17',
    publicDescription: 'TriOptima is a fintech company founded in Stockholm in 2000, now part of the NEX group. They specialize in post-trade risk management and performance optimization for OTC derivatives. They currently have offices in Stockholm, New York, London, Tokyo, and Singapore. One of their products, TriReduce, is the de facto standard in the financial market within compression of OTC derivative portfolios. Their headquarters are located in Stockholm, and as an international company, they offer employees many opportunities to work abroad.\n\n' +
    'When Studs arrived, we were first introduced to a talk on the company’s history, their business and area of expertise, and what working at TriOptima as a developer is like. Developers at TriOptima are encouraged to work in a programming environment of their own choice and to work closely with members of other teams in order to bring their customers the best products possible. The talk was followed by a tour of their newly finished office and a laid-back dinner with some of the company’s employees from different departments. We then got a chance to hang out and get to know them over a game of pool or darts, or just a casual beer in the office lounge. The event at the offices then concluded with a hot mug of glögg on their rooftop with a spectacular view of Stockholm.\n\n' +
    'As graduating students in computer science related fields, we were encouraged to reach out to TriOptima with our own suggestions for interesting collaborative projects. We felt that despite acting in a very complex business area and enjoying a very fast growth, TriOptima is a company which has maintained their sense of familiarity. Their efforts to provide a work environment that is encouraging and inclusive is something we at Studs value. After concluding the event with a trip by party bus to the TriOptima sponsored pub, we were left with the impression of working at TriOptima being both exciting and approachable.',
    pictures: [
      'https://d3bqsjuj0u9ogk.cloudfront.net/apartment_images/3b03dec2-4d68-4d35-91a4-882ed0b2659a/nooks-katarina-bangata-59A-11.jpg',
      'https://d3bqsjuj0u9ogk.cloudfront.net/apartment_images/3b03dec2-4d68-4d35-91a4-882ed0b2659a/nooks-katarina-bangata-59A-13.jpg',
      'https://d3bqsjuj0u9ogk.cloudfront.net/apartment_images/3b03dec2-4d68-4d35-91a4-882ed0b2659a/nooks-katarina-bangata-59A-14.jpg',
      'https://d3bqsjuj0u9ogk.cloudfront.net/apartment_images/3b03dec2-4d68-4d35-91a4-882ed0b2659a/nooks-katarina-bangata-59A-15.jpg',
    ],
  }, {
    companyName: 'Cygni',
    date: '7 Dec 2017',
    adress: 'Jakobsbergsgatan 22',
    publicDescription: 'Cygni is a technical consulting company that has as its primary aim to attract top technical talent by being the best place to work for ambitious software developers. And this doesn’t seem to be just words, Cygni has been named the Best workplace in Sweden and third best in Europe by the Great Place To Work foundation. To their clients Cygni offer both consultants to join their organization on a temporary basis, or engagements where the entire project is carried out and delivered by Cygni consultants. They work in several domains; Full-stack, mobile, as well as Front-end and UX/Design.\n\n' +
    'A running theme for our visit was “What is important when you are looking for your first job?”. During the evening we got insight into what senior members of the company thought this entailed, taking the viewpoint of someone who has recently graduated from KTH. In their view some of the most important aspects to keep in mind were the ability to grow, further one\'s education, and finally compensation. Cygni routinely offers courses in different aspects of technology for their employees, so that they are able to expand their abilities and take on whatever challenges they face.\n\n' +
    'When it comes to compensation Cygni believes in two things. The first is keeping a simple model that is clearly defined and easily understood and the second is having a high baseline that is very competitive. They also spent some time highlighting their Trainee-program which is a two year program that contains both a lot of mentorship, and real projects with real clients. We rounded out our visit by speaking to some of their consultants to learn about their impressions of working at Cygni.',
    pictures: [
      'https://d3bqsjuj0u9ogk.cloudfront.net/apartment_images/3b03dec2-4d68-4d35-91a4-882ed0b2659a/nooks-katarina-bangata-59A-11.jpg',
      'https://d3bqsjuj0u9ogk.cloudfront.net/apartment_images/3b03dec2-4d68-4d35-91a4-882ed0b2659a/nooks-katarina-bangata-59A-13.jpg',
      'https://d3bqsjuj0u9ogk.cloudfront.net/apartment_images/3b03dec2-4d68-4d35-91a4-882ed0b2659a/nooks-katarina-bangata-59A-14.jpg',
      'https://d3bqsjuj0u9ogk.cloudfront.net/apartment_images/3b03dec2-4d68-4d35-91a4-882ed0b2659a/nooks-katarina-bangata-59A-15.jpg',
    ],
  },
]

export class PublicEvents extends React.Component {
  constructor(props) {
    super(props)
    this.state = { events: [] }
  }

  componentDidMount() {
    this.setState({
      events: data,
    })

    Events.scrollEvent.register('begin')
    Events.scrollEvent.register('end')

    scrollSpy.update()
    animateScroll.scrollTo(1)

    const company = this.props.match.params.company
    console.log(company)
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
        <div className={styles.eventList}>
          { events.map(e => <PublicEvent key={e.id} {...e} />)}
        </div>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

PublicEvents.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      company: PropTypes.string,
    }),
  }),
}


export default connect(null, mapDispatchToProps)(PublicEvents)
