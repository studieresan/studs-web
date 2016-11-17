import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: ''
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }
  
  handleUserChange(event) {
    this.setState({user: event.target.value});
  }

  handlePassChange(event) {
    this.setState({pass: event.target.valeu});
  }

  handleLogin() {
    // TODO auth
  }

	render() {
    const {user, pass} = this.state;
		return (
		  <div>
		    <h1>Login</h1>
        <input placeholder='Username' type='text' value={user} onChange={this.handleUserChange} />
        <input placeholder='Password' type='password' value={pass} onChange={this.handlePassChange} />
        <button onClick={this.handleLogin}>Login</button>
		  </div>
		);
	}
}

export default Login;
