/**
*
* TextArea
*
*/

import React, { PropTypes } from 'react';



class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      height: 0
    };
  }
  onChange(...args) {
    this.props.onChange(...args);
  }
  componentDidUpdate() {
    console.log("update");
    console.log(this.textarea.getBoundingClientRect());
  }
  render() {
    const { name, value } = this.props;
    return (
      <textarea
        name={name}
        value={value}
        onChange={this.onChange}
        ref={textarea => this.textarea = textarea} />
    );
  }
}

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default TextArea;
