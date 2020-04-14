import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Button, ListGroup, Nav } from 'react-bootstrap';

class Header extends Component {

  render() {

     const {userData,deconnexion} = this.props;

    return (
       <Nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
         <div className="container">
           <Link className="navbar-brand" to="/">Laravel</Link>
           <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span className="navbar-toggler-icon">{userData.name}</span>
           </Button>
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ListGroup className="navbar-nav mr-auto">

               </ListGroup>

               <ListGroup className="navbar-nav ml-auto">
                  {!this.props.userIsLoggedIn ?
                    <ListGroup.Item className="nav-item"><Link to="/login">Login</Link></ListGroup.Item>: ""}
                  {this.props.userIsLoggedIn ?
                    <ListGroup.Item className="nav-item dropdown">

                      <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {userData.name}
                            <span className="caret"></span>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" role="button" onClick={deconnexion}>
                                Deconnexion
                            </a>
                      </div>
                    </ListGroup.Item>: ""}
                  </ListGroup>
                </div>
            </div>
      </Nav>
    )
  }
}

export default withRouter(Header)