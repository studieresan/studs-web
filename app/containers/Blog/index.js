import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import PropTypes from 'prop-types'
import styles from './styles.css'
import messages from './messages'
import BlogList from '../../components/BlogList'
import BlogCreate from '../../components/BlogCreate'

import { FormattedMessage } from 'react-intl'

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
          <BlogCreate
            user={this.props.user}
            saveNewPost={post => this.props.saveNewPost(post)}
          />
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
  saveNewPost: PropTypes.func.isRequired,
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
