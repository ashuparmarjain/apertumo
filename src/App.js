import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './Pages/login/login';
import PrivateRoute from './HOC/private_route';

class App extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} /> 
          <Route path="/*">
            <PrivateRoute/>
          </Route>
        </Switch>
      </Router>

    );
  }

}

export default App;
