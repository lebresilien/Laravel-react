import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Router';
import Login from './views/Login/Login';

class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={Main} />
      </BrowserRouter>
      
    );
  }
}
ReactDOM.render(<Index/>, document.getElementById('root'));