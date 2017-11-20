import React from 'react'
import PropTypes from 'prop-types'

class TextArea extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(...args) {
    this.props.onChange(...args)
  }

  render() {
    const { name, value } = this.props
    return (
      <textarea
        name={name}
        value={value}
        onChange={this.onChange}
        ref={textarea => this.textarea = textarea} />
    )
  }
}

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextArea
