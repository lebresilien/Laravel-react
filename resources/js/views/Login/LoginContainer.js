import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';

class LoginContainer extends Component {  

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      error: '',
      formSubmitting: false,
      user: {
        email: '',
        password: '',
      },
      redirect: props.redirect,
    };    

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }  

  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
    }
  }  

  componentDidMount() {
    const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/dashboard' } };
    if (prevLocation && this.state.isLoggedIn) {
      return this.props.history.push(prevLocation);
    }
  }  

  handleSubmit(e) {
    e.preventDefault();
    this.setState({formSubmitting: true});
    let userData = this.state.user;

    axios.post("/login", userData).then(response => {
      return response;
    })
    .then(json => {
         if (json.data.success) {
           let userData = {
             id: json.data.id,
             name: json.data.name,
             email: json.data.email,
             access_token: json.data.access_token,
           };
           let appState = {
             isLoggedIn: true,
             user: userData
           };
           localStorage["appState"] = JSON.stringify(appState);
           this.setState({
              isLoggedIn: appState.isLoggedIn,
              user: appState.user,
              error: ''
           });
           location.reload()
         }         
         else {
            alert(`Our System Failed To Register Your Account!`);
         }
    })
    .catch(error => {
      if (error.response) {
        let err = error.response.data;
        this.setState({
          error: err.message,
          errorMessage: err.errors,
          formSubmitting: false
        })
      }
      else if (error.request) {
        let err = error.request;
        this.setState({
          error: err,
          formSubmitting: false
        })
      } else {
       let err = error.message;
       this.setState({
         error: err,
         formSubmitting: false
       })
      }
    })
    .finally(this.setState({error: ''}));
}

handleEmail(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, email: value
    }
  }));
}

handlePassword(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, password: value
    }
  }));
}

handleRemember(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, remember_me: value
    }
  }));
}

render() {

  const { state = {} } = this.state.redirect;
  const { error } = state; 

  return (
    <div className="container">
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
          <h2 className="text-center mb30">Log In To Your Account</h2>
          {this.state.isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>
          <h5 className={"alert alert-success"}>Login successful, redirecting...</h5></FlashMessage> : ''}
          {this.state.error ? <FlashMessage duration={100000} persistOnHover={true}>
          <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5></FlashMessage> : ''}
          {error && !this.state.isLoggedIn ? <FlashMessage duration={100000} persistOnHover={true}>
          <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}         
           
           <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="E-mail" required onChange={this.handleEmail}/> 
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" required onChange={this.handlePassword}/>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check  type="checkbox" onChange={this.handleRemember} label="Check me out"/>
            </Form.Group>

           <Button disabled={this.state.formSubmitting} type="submit"> 
               {this.state.formSubmitting ? "Logging You In..." : "Log In"} 
           </Button>
           
           </Form>  

           <p className="text-yellow">Don't have an account? 
            <Link to="/register" className="text-yellow"> Register</Link>
            <span className="pull-right">
               <Link to="/" className="text-yellow">Back to Index</Link>
            </span>
          </p>

        </div>        
          
      </div>
    </div>
    )
  }
}
export default withRouter(LoginContainer);