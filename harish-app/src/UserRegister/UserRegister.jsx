import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { userActions } from '../_actions';
import MaleUser from  '../Assets/MaleUser.png';
import 'bootstrap/dist/css/bootstrap.min.css';

class UserRegister extends React.Component  {
   constructor(props){
     super(props);
     this.state = {
       firstName: '',
       lastName: '',
       userName: '',
       password: '',
       userImage:MaleUser,
       submitted: false
     }
     this.fileInput = React.createRef();
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleCancel = this.handleCancel.bind(this);
     this.handleImageClick = this.handleImageClick.bind(this);
     this.readImageURL = this.readImageURL.bind(this);
   }

  handleImageClick(e){
    e.preventDefault();
    this.fileInput.current.click();
  }

readImageURL(e){
   e.preventDefault();
   var reader = new FileReader();
   reader.onload = (e:any) => {
     this.setState({
       userImage: e.target.result
     });
   }
   if (e.target.files && e.target.files[0]) {
     reader.readAsDataURL(e.target.files[0]);
   }else{
     this.setState({
     userImage: MaleUser
     });
   }
}

   handleCancel(e){
     history.push('/login');
   }

   handleChange(e) {
       const { name, value } = e.target;
       this.setState({ [name]: value });
   }

   handleSubmit(e) {
       e.preventDefault();
       this.setState({ submitted: true });
       const { firstName, lastName, username, password, userImage } = this.state;
       const { dispatch } = this.props;
       if (username && password && firstName && lastName && userImage) {
           dispatch(userActions.registerUser(firstName, lastName, username, password, userImage));
       }
   }

   render(){
     const { registering } = this.props;
     const { firstName, lastName, username, password, userImage, submitted } = this.state;
     return(
      <div className="container">
       <div className="col-md-6 offset-md-3">
           <h2 className="text-center">User Registration</h2>
           <form name="form" onSubmit={this.handleSubmit}>
            <div class="form-group text-center">
       			  <img alt='' src={userImage} className="img-fluid img-thumbnail" height="250rem" width="150rem" onClick={this.handleImageClick}/>
       			  <input className="form-control-file d-none" id="fileInput" type="file" ref={this.fileInput} name="userImageHidden" onChange={this.readImageURL}/>
       		   </div>
             <div className={'form-group' + (submitted && !firstName ? ' has-error' : '')}>
               <input type="text" placeholder="First Name" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
               {submitted && !firstName &&
                   <div className="help-block">First Name is required</div>
               }
               </div>
               <div className={'form-group' + (submitted && !lastName ? ' has-error' : '')}>
                 <input type="text" placeholder="Last Name" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                 {submitted && !lastName &&
                     <div className="help-block">Last Name is required</div>
                 }
                 </div>
               <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                   <input type="text" placeholder="Username" className="form-control" name="username" value={username} onChange={this.handleChange} />
                   {submitted && !username &&
                       <div className="help-block">Username is required</div>
                   }
               </div>
               <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                   <input type="password" placeholder="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                   {submitted && !password &&
                       <div className="help-block">Password is required</div>
                   }
               </div>
               <div className="form-group text-center">
                   <button className="btn btn-primary">Register User</button>
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
    const { registering } = state.users;
    return {
        registering
    };
}

const connectedLoginPage = connect(mapStateToProps)(UserRegister);
export { connectedLoginPage as UserRegister };
