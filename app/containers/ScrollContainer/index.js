import { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ScrollContainer extends Component {
  componentDidUpdate(prevProps) {
    // scroll to top when route changes,
    // to ensure starting at the top of the page
    // when clicking links
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

ScrollContainer.propTypes = {
  location: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default withRouter(ScrollContainer)
