import React, {Component} from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }  
  
  componentWilMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
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
        <Footer/>
      </div>
      )
    }
  }

export default Home