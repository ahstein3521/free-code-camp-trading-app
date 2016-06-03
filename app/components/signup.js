import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import { Link } from 'react-router';

 class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email,name,location, password, passwordConfirm }} = this.props;

    return (
        <form className='signup-form'  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h2>SIGN UP</h2>
           <fieldset className="form-group">
            <label>Name:</label>
            <input {...name} type='text' className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <label>Location:</label>
            <input {...location} type='text' className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <label>Email:</label>
            <input {...email} type='email' className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <label>Password:</label>
            <input  {...password}type="password" className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <label>Confirm Password:</label>
            <input {...passwordConfirm}  type="password" className="form-control" />
            {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
          </fieldset>
          {this.renderAlert()}
          <fieldset className='signin-btn'>
            <button action="submit" className="btn">Sign Up</button>
            <Link to={'/'}>
              <button action="submit" className="btn btn-cancel">Cancel</button>
            </Link>
          </fieldset>
        </form>      
    );
  }
}
function validate(formProps) {
  const errors = {};
  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
// console.log(state)
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password','name','location', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);