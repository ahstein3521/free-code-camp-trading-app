import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import { Link } from 'react-router';

 class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oh Nooooooooooooooooo! </strong> 
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password}} = this.props;

    return (
      <form className='signup-form' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <h2>Welcome Back!</h2>
        <fieldset className="form-group">
          <label>User Name or Email:</label>
          <input {...email} type='text' className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password}  type="password" className="form-control" />
        </fieldset>
         {this.renderAlert()}
        <fieldset className='signin-btn'>
            <Link to={'/'}>
              <button action="submit" className="btn btn-cancel">Cancel</button>
            </Link>
            <button action="submit" className="btn">Sign in</button>          
        </fieldset>
      </form>      
    );
  }
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);