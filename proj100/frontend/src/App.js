import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import EditInfo from "./components/EditInfo";
import Landing from "./components/Landing";
import Profile from "./components/Profile"
import SearchResults from "./components/SearchResults"


class App extends Component {


  render() {
    return (
      <div className="App">
      	<Router>
      		<Route exact={true} path="/" component={Landing}/>
      		<Route exact={true} path="/login" component={LogIn}/>
      		<Route exact={true} path="/signup" component={SignUp}/>
      		<Route exact={true} path="/home" component={Home}/>
      		<Route exact={true} path="/edit-info" component={EditInfo}/>
          <Route exact={true} path="/profile/:profile_username" component={Profile}/>
          <Route exact={true} path="/search/:search_string" component={SearchResults}/>
      	</Router>
      </div>
    );
  }
}

export default App;
