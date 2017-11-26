/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import MemberHomePage from '../../components/MemberHomePage'
import messages from './messages'
import styles from './styles.css'
import Section from '../../components/Section'
import Front9 from '../../static/img/front-9.jpg'
import Front10 from '../../static/img/front-10.jpg'
import Report2016 from '../../static/img/top-transparent.png'
import Report2016pdf from 'file-loader!../../static/Studs_16_report.pdf'
import * as actions from '../Members/actions'

import {
  HomePageHeader,
  HomePageSalesContact,
} from 'components/HomePage'

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const sectionReversed = styles.section + ' ' + styles.reverse
    const users = this.props.users.toJS()

    return (
    <div>
      <HomePageHeader />
      <div className={styles.content}>
        <div className={sectionReversed}>
          <Section {...messages.description} />
          <div className={styles.overlay} >
            <img src={Front9}  />
          </div>
        </div>
        <div className={styles.section}>
          <Section {...messages.students} />
          <div className={styles.overlay} >
            <img src={Front10} />
          </div>
        </div>
        <div className={styles.members}>
          <div className={styles.membersTitle}>
            <h2 className={styles.members}>
              <FormattedMessage {...messages.members.header} />
            </h2>
          </div>
          { users.map(user => <MemberHomePage key={user.id} user={user}/>) }
        </div>
      </div>
      <div className={styles.report}>
          <h1><FormattedHTMLMessage {...messages.report.lastYear} /></h1>
          <a href={Report2016pdf}>
            <img src={Report2016} />
          </a>
      </div>
      <HomePageSalesContact />
    </div>
    )
  }
}

HomePage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    users: state.getIn(['members', 'users']),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
