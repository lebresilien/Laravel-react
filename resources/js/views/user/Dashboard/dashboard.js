import React, {Component} from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { Table} from 'react-bootstrap';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
   this.deconnexion = this.deconnexion.bind(this)
  }
  
  componentDidMount() {
    let state = localStorage["appState"];
    if(state) {
      let AppState = JSON.parse(state);
      this.setState({
        isLoggedIn: AppState.isLoggedIn,
        user: AppState.user},
        function(){
        
      });
     
    }
  }

  deconnexion(e)
  {
     e.preventDefault();
     let appState = {
      isLoggedIn: false,
      user: {}
     };
     localStorage["appState"] = JSON.stringify(appState);
     this.setState({user: appState.user, isLoggedIn: appState.isLoggedIn},function(){
     this.props.history.push('/login');
    })
  }
  
render() {

    return (
      <div>
        <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} deconnexion={this.deconnexion} />
          
          <Table striped bordered hover>
            <tbody>
              <tr>
                <th scope="row ">User Id</th>
                <td>{this.state.user.id}</td>
              </tr>
              <tr>
                <th scope="row ">Full Name</th>
                <td>{this.state.user.name}</td>
              </tr>
              <tr>
                <th scope="row ">Email</th>
                <td>{this.state.user.email}</td>
              </tr>
            </tbody>
          </Table>

        <Footer />
      </div>
      )
    }
  }
  export default Home
