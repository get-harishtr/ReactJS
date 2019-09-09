import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { employeeActions } from '../_actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';

class EmployeeRegister extends React.Component  {
   constructor(props){
     super(props);
     this.state = {
       firstName: '',
       lastName: '',
       gender: '',
       dateOfBirth: '',
       submitted: false
     }

     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(e) {
       const { name, value } = e.target;
       this.setState({ [name]: value });
   }

   handleSubmit(e) {
       e.preventDefault();
       this.setState({ submitted: true });
       const { firstName, lastName, gender, dateOfBirth } = this.state;
       const { dispatch } = this.props;
       if (firstName && lastName && gender && dateOfBirth ) {
           dispatch(employeeActions.registerEmployee(firstName, lastName, gender, dateOfBirth));
       }
   }

   render(){
     const { registering } = this.props;
     const { firstName, lastName, gender, dateOfBirth, submitted } = this.state;
     return(
      <div className="container">
       <div className="col-md-7 offset-md-3">
           <h2 className="text-center">Employee Details:</h2>
           <form name="form" onSubmit={this.handleSubmit}>
             <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
             	 <label>First Name</label>
               <input type="text" placeholder="First Name" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
               {submitted && !firstName &&
                   <div className="help-block">First Name is required</div>
               }
               </div>
               <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                	<label>Last Name</label>
                 <input type="text" placeholder="Last Name" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                 {submitted && !lastName &&
                     <div className="help-block">Last Name is required</div>
                 }
                 </div>
               <div className={'form-group' + (submitted && !gender ? ' has-error' : '')}>
                  <label>Gender</label>
                  <select name="gender" className="form-control" onChange={this.handleChange}>
                    <option disabled selected value> -- select an option -- </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                   {submitted && !gender &&
                       <div className="help-block">Gender is required</div>
                   }
               </div>
               <div className={'form-group' + (submitted && !dateOfBirth ? ' has-error' : '')}>
                   <label>Date Of Birth</label>
                   <input type="date" placeholder="Date Of Birth" className="form-control" name="dateOfBirth" value={dateOfBirth} onChange={this.handleChange} />
                   {submitted && !dateOfBirth &&
                       <div className="help-block">Date Of Birth is required</div>
                   }
               </div>
               <div className="form-group text-center">
                   <button className="btn btn-primary">Register</button>
                   {registering &&
                       <img alt='' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                   }
                   <Link  className="btn btn-link" to="/">Cancel</Link>
               </div>
           </form>
       </div>
      </div>
     );
   }

}



function mapStateToProps(state) {
    const { registering } = state.employees;
    return {
        registering
    };
}

const connectedLoginPage = connect(mapStateToProps)(EmployeeRegister);
export { connectedLoginPage as EmployeeRegister };
