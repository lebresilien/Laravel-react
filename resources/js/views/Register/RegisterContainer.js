import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';

class RegisterContainer extends Component {

constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      error: '',
      errorMessage: '',
      formSubmitting: false,
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    },
    redirect: props.redirect,
};
this.handleSubmit = this.handleSubmit.bind(this);
this.handleName = this.handleName.bind(this);
this.handleEmail = this.handleEmail.bind(this);
this.handlePassword = this.handlePassword.bind(this);
this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
}

componentWillMount() {
  let state = localStorage["appState"];
  if (state) {
    let AppState = JSON.parse(state);
    this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
  }
  if (this.state.isRegistered) {
    return this.props.history.push("/dashboard");
  }
}

componentDidMount() {
  const { prevLocation } = this.state.redirect.state || {prevLocation: { pathname: '/dashboard' } };
  if (prevLocation && this.state.isLoggedIn) {
    return this.props.history.push(prevLocation);
  }
}

handleSubmit(e) {
  e.preventDefault();
  this.setState({formSubmitting: true});
  ReactDOM.findDOMNode(this).scrollIntoView();
  let userData = this.state.user;
   
  axios.post("/register", userData)
    .then(response => {  
    })
    .then(json => {
      if (json.data.success) {
        let userData = {
          id: json.data.id,
          name: json.data.name,
          email: json.data.email,
          activation_token: json.data.activation_token,
        };
        let appState = {
          isRegistered: true,
          user: userData
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isRegistered: appState.isRegistered,
          user: appState.user
        });
      } else {
          this.setState({
                error: "Veuillez remplir correctements les champs!!!!",
                errorMessage: json.data.errors,
                formSubmitting: false
          })
          
      }
    })
    .catch(error => {
     if (error.response) {
      let err = error.response;
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

handleName(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, name: value
    }
  }));
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
handlePasswordConfirm(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, password_confirmation: value
    }
  }));
}

render() {
 
  let errorMessage = this.state.errorMessage;
  let arr = [];
  Object.values(errorMessage).forEach((value) => (
    arr.push(value)
  ));  

  return (

    <div className="container">
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
          <h2>Create Your Account</h2>
        {this.state.isRegistered ? <FlashMessage duration={60000} persistOnHover={true}>
          <h5 className={"alert alert-success"}>Registration successful, redirecting...</h5></FlashMessage> : ''}
        {this.state.error ? <FlashMessage duration={900000} persistOnHover={true}>
          <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5>
          <ListGroup as="ul">
            {arr.map((item, i) => (
              <ListGroup.Item as="li" key={i} className="list-group-item">
                  <h5 style={{color: 'red'}}>{item}</h5>
              </ListGroup.Item>
             ))}
          </ListGroup>

          </FlashMessage> : ''}

          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="formBasicText">
              <Form.Control type="text" placeholder="Name"  required onChange={this.handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Control type="email" placeholder="E-mail" required onChange={this.handleEmail}/>
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Control type="password" placeholder="Password" required onChange={this.handlePassword}/>
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Control type="password" placeholder="Confirm password" required onChange={this.handlePasswordConfirm}/>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={this.state.formSubmitting ? "disabled" : ""}>
                Create Account
            </Button>
          
          </Form>

          <p className="text-yellow">
            <span className=""> Already have an account? </span>
            <Link to="/login" className="text-yellow"> Log In</Link>
            <span className="pull-right"><Link to="/" className="text-white">Back to Home</Link></span>
          </p>
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(RegisterContainer);