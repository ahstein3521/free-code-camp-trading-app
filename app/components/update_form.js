import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';
import { Link } from 'react-router';

 class Update extends Component {
  handleFormSubmit(formProps) {
    this.props.updateUser(this.props.user.name,formProps);
  }

  render() {
    const { handleSubmit, fields: { displayName,location }} = this.props;

    return (
        <form className='signup-form'  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h2>Your Info</h2>
           <fieldset className="form-group">
            <label>Name:</label>
            <input {...displayName} type='text' className="form-control" placeholder={this.props.user.displayName} required/>
          </fieldset>
          <fieldset className="form-group">
            <label>Location:</label>
            <input {...location} type='text' className="form-control" placeholder={this.props.user.location} required/>
          </fieldset>
          <fieldset className='signin-btn'>
            <button action="submit" className="btn">Update</button>
            <Link to={'/'}>
              <button action="submit" className="btn btn-cancel">Cancel</button>
            </Link>
          </fieldset>
        </form>      
    );
  }
}

function mapStateToProps(state) {
// console.log(state)
  return { errorMessage: state.auth.error, user:state.user };
}

export default reduxForm({
  form: 'update',
  fields: ['displayName','location']
}, mapStateToProps, actions)(Update);