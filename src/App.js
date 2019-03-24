import React, { Component } from 'react';
import { Router, Link, navigate } from '@reach/router'
import firebase from './components/Firebase'

import Home from './components/Home'
import Welcome from './components/Welcome'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Meetings from './components/Meetings'


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    }
  }

  componentDidMount() {
    // const ref = firebase.database().ref('user')

    // ref.on('value', snapshot => {
    //   let FBUser = snapshot.val()
    //   this.setState({user: FBUser})
    // })

    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          uid: FBUser.uid
        })
      }
    })
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        })
        navigate('/meetings')
      })
    })
  }

  logoutUser = e => {
    e.preventDefault()
    this.setState({
      userID: null,
      user: null,
      displayName: null
    })
    firebase.auth().signOut().then(() => navigate('/login'))
  }

  render() {
    return (
      <div>

      <Navigation logoutUser={this.logoutUser} user={this.state.user}/>
      {this.state.user && (<Welcome logoutUser={this.logoutUser} userName={this.state.displayName}/>)}

      <Router>
      
        <Home path="/" user={this.state.user}/>
        <Login path="/login" />
        <Meetings path="/meetings" />
        <Register path="/register" registerUser={this.registerUser} />

      </Router>

        

      
      </div>

    );
  }
}

export default App;
