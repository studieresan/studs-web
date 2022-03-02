import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import PropTypes, { number } from 'prop-types'
import styles from './styles.css'
import messages from './messages'
import BlogList from '../../components/BlogList'
import BlogCreate from '../../components/BlogCreate'
import artinImg from '../../static/img/people/studs2022/artin.jpg'
import emelieImg from '../../static/img/people/studs2022/emelie.jpg'
import evaImg from '../../static/img/people/studs2022/eva.jpg'

import { FormattedMessage } from 'react-intl'

const blogposts = [
  {
    id: 'id1',
    title: 'title1',
    description: 'description1',
    date: '2022-01-01',
    studsYear: 2022,
    author: 'Philip',
    frontPicture: artinImg,
    pictures: [artinImg, artinImg],
    published: true,
  },
  {
    id: 'id2',
    title: 'title2',
    description: 'description2',
    date: '2022-01-02',
    studsYear: 2022,
    author: 'Artin',
    frontPicture: emelieImg,
    pictures: [emelieImg, emelieImg],
    published: true,
  },
  {
    id: 'id3',
    title: 'title2',
    description: 'description2',
    date: '2022-01-02',
    studsYear: 2022,
    author: 'Artin',
    frontPicture: evaImg,
    pictures: [emelieImg, emelieImg],
    published: true,
  },
]

export class Blog extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { params, path } = this.props.match
    if (path === '/blog') {
      return (
        <React.Fragment>
          <div className={styles.title}>
            <h1>
              {' '}
              <FormattedMessage {...messages.title} />
            </h1>
          </div>
          <BlogList user={this.props.user} posts={blogposts} />
        </React.Fragment>
      )
    } else if (path === '/blog') {
      return (
        <React.Fragment>
          <div className={styles.title}>
            <h1>
              {' '}
              <FormattedMessage {...messages.title} />
            </h1>
          </div>
          <BlogList user={this.props.user} posts={this.props.posts} />
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <div className={styles.title}>
          <h1>
            {' '}
            <FormattedMessage {...messages.title} />
          </h1>
        </div>
      </React.Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}
function mapStateToProps(state) {
  return {
    user: state.getIn(['user', 'user']),
    fetching: state.getIn(['blog', 'fetching']),
    fetchFail: state.getIn(['blog', 'fetchFail']),
    posts: state.getIn(['blog', 'posts']).toJS(),
  }
}

Blog.propTypes = {
  // mapDispatchToProps
  getPosts: PropTypes.func.isRequired,
  // Mapstatetoprops
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchFail: PropTypes.bool.isRequired,
  // Inbyggt (används för path och params)
  match: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
