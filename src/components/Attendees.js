import React from 'react'
import firebase from '../components/Firebase'
import AttendeesList from '../components/AttendeesList'
import { FaUndo } from 'react-icons/fa'

class Attendees extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            displayAttendees: [],
            searchQuery: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.resetQuery = this.resetQuery.bind(this)
    }

    componentDidMount() {
        const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`)
        ref.on('value', snapshot => {
            let attendees = snapshot.val();
            let attendeesList = []
            for(let item in attendees) {
                attendeesList.push({
                    attendeeID: item,
                    attendeeName: attendees[item].attendeeName,
                    attendeeEmail: attendees[item].attendeeEmail,
                    star: attendees[item].star
                })
            }
            this.setState({ displayAttendees: attendeesList})
        })

    }


    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue })
    }


    resetQuery() {
        this.setState({searchQuery: ''})
    }


    render() {

        const dataFilter = item => item.attendeeName
                                .toLowerCase()
                                .match(this.state.searchQuery.toLowerCase()) && true
        const filterAttendees = this.state.displayAttendees.filter(dataFilter)

        return(
            <div className="container mt-4">
                <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="font-weight-light text-center">
                    Attendees
                    </h1>

                    <div className="card bg-light mb-4">
                        <div className="card-body text-center">
                            <div className="input-group input-group-lg">
                                <input 
                                type="text" 
                                name="searchQuery" 
                                value={this.state.searchQuery} 
                                placeholder="Search Attendees" 
                                className="form-control" 
                                onChange={this.handleChange} />
                                <div class="input-group-append">
                                    <button className="btn btn-sm btn-outline-info" title="Reset Search" onClick={() => this.resetQuery()}>
                                        <FaUndo />
                                    </button>
                                </div>
                            </div>
                        </div>                    
                    </div>

                </div>
                </div>
                <AttendeesList 
                meetingID={this.props.meetingID} 
                userID={this.props.userID} 
                adminUser={this.props.adminUser} 
                attendees={filterAttendees} />
            </div>
          
        )
    }
      
}

export default Attendees