import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './actions'
import PropTypes, { number } from 'prop-types'
import styles from './styles.css'
import messages from './messages'
import BlogList from '../../components/BlogList'
import BlogCreate from '../../components/BlogCreate'
import BlowView from '../../components/BlogView'
import { FormattedMessage } from 'react-intl'
import { getUsers } from '../Members/actions'
import { setStudsYear } from '../../store/salesTool/actions'

export class Blog extends Component {
  componentDidMount() {
    console.log(this.props.users)
    if (!this.props.users || !this.props.users.length) {
      this.props.getUsers()
    }
    this.props.getPosts()
  }

  setCurrentPost(id) {
    const { params, path } = this.props.match
    const post = this.props.posts.find(e => e.id === id)
    this.props.editPost(post)
  }

  render() {
    console.log(this.props.posts)
    const { params, path } = this.props.match
    if (path === '/blog/edit/:id' || path === '/blog/new') {
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
            savePost={() => this.props.savePost(this.props.post)}
            post={this.props.post}
            editPost={edit => this.props.editPost(edit)}
            users={this.props.users}
            addPicture={url => this.props.addPicture(url)}
            removePicture={index => this.props.removePicture(index)}
            removeFrontPicture={() => this.props.removeFrontPicture()}
            setCurrentPost={id => this.setCurrentPost(id)}
            match={this.props.match}
            removePost={id => this.props.removePost(id)}
          />
        </React.Fragment>
      )
    } else if (path === '/blog') {
      return (
        <React.Fragment>
          <div className={styles.title}>
            <h1>
              <FormattedMessage {...messages.title} />
            </h1>
          </div>
          <BlogList user={this.props.user} posts={this.props.posts} />
        </React.Fragment>
      )
    } else if (path === '/blog/view/:id') {
      return (
        <React.Fragment>
          <div className={styles.viewNoTitle} />
          <BlowView
            post={this.props.post}
            setCurrentPost={id => this.setCurrentPost(id)}
            match={this.props.match}
          />
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
  return bindActionCreators({ ...actions, getUsers }, dispatch)
}
function mapStateToProps(state) {
  return {
    user: state.getIn(['global', 'user']),
    users: state.getIn(['members', 'users']).toJS(),
    fetching: state.getIn(['blog', 'fetching']),
    fetchFail: state.getIn(['blog', 'fetchFail']),
    posts: state.getIn(['blog', 'posts']).toJS(),
    post: state.getIn(['blog', 'post']),
  }
}

Blog.propTypes = {
  // mapDispatchToProps
  removePost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  savePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  addPicture: PropTypes.func.isRequired,
  removePicture: PropTypes.func.isRequired,
  removeFrontPicture: PropTypes.func.isRequired,
  // Mapstatetoprops
  post: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchFail: PropTypes.bool.isRequired,
  // Inbyggt (används för path och params)
  match: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
