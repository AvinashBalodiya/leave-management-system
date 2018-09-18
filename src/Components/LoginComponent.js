import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

class LoginComponent extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			email:'',
			password:'',
			error:false
		}
	}

	handleChange(event) {
	    this.setState({[event.target.name]: event.target.value});
	}

	handleSubmit(event) { event.preventDefault();
		this.setState({error: false});
		const email = this.state.email;
		const password = this.state.password;

		const user = this.props.users.find(function(u){
			return u.email===email&&u.password===password;
		});
		
		if(user) {
			localStorage.setItem('lastLogin', moment().format("YYYY-MM-DD hh:mm:ss"));
			this.props.logIn(user);
		} else {
			this.setState({error: true});
		}
	}

  render() {
    return (
    	<div>
    		<h1>Login Page</h1>
    		<div className="container">
				<form onSubmit={this.handleSubmit} className="form-horizontal">
					<div className="form-group">
						<label className="col-md-offset-2 col-sm-2" htmlFor="email">Email:</label>
						<div className="col-sm-4">
							<input type="text" 
								className="form-control" 
								name="email"
								placeholder="email"
								value={this.state.email} 
								onChange={this.handleChange} 
								id="email"/>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="password" className="col-md-offset-2 col-sm-2">Password:</label>
						<div className="col-sm-4">
							<input type="password" name="password" placeholder="password" id="password" 
								className="form-control" 
							value={this.state.password} onChange={this.handleChange} />
						</div>
					</div>
					<div style={{color:'red'}}>{this.state.error ? 'Invalid email/password' : ''}</div>
					<button className="btn btn-default">Submit</button>
				</form>
			</div>
    	</div>
    );
  }
}

const mapStateToProps = state => {
    return {
        users:state.users,
        user:state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (user) =>
            dispatch({
                type: 'LOGIN_USER',
                payload:user
            }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
