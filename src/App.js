import React, { Component } from 'react';
import { Router, Link, navigate } from '@reach/router'
import firebase from './components/Firebase'

import Home from './components/Home'
import Welcome from './components/Welcome'
import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Meetings from './components/Meetings'
import CheckIn from './components/CheckIn'
import Attendees from './components/Attendees'


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
          userID: FBUser.uid
        })

        const meetingsRef = firebase.database().ref('meetings/' + FBUser.uid)

        meetingsRef.on('value', snapshot => {

          let meetings = snapshot.val()
          let meetingsList = []
          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            })
          }

          this.setState({meetings: meetingsList, howManyMeetings: meetingsList.length})

        })

      } else {
        this.setState({user: null})
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

  addMeeting = meetingName => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`)
    ref.push({meetingName: meetingName})
  }

  render() {
    return (
      <div>

      <Navigation logoutUser={this.logoutUser} user={this.state.user}/>
      {this.state.user && (<Welcome logoutUser={this.logoutUser} userName={this.state.displayName}/>)}

      <Router>
      
        <Home path="/" user={this.state.user}/>
        <Login path="/login" />
        <Meetings userID={this.state.userID} path="/meetings" meetings={this.state.meetings} addMeeting={this.addMeeting} />
        <Attendees path="/attendees/:userID/:meetingsID" adminUser={this.state.userID} />
        <CheckIn path="/checkin/:userID/:meetingID"  />
        <Register path="/register" registerUser={this.registerUser} />

      </Router>

        

      
      </div>

    );
  }
}

export default App;
