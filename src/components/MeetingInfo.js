import React from 'react'
import firebase from '../components/Firebase'
import { navigate } from '@reach/router'
import DatePicker from "react-datepicker";
import AddToCalendar from 'react-add-to-calendar';

import "react-datepicker/dist/react-datepicker.css";

class MeetingInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meetingName: '',
            meetingLocation: '',
            meetingDescription: '',
            meetingStart: new Date(),
            meetingEnd: new Date(),
            check: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleStart = this.handleStart.bind(this)
        this.handleEnd = this.handleEnd.bind(this)

    }

    componentDidMount() {
        const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}`)
        ref.on('value', snapshot => {
            let item = snapshot.val() 
            this.setState({
                meetingName: item.meetingName,
                meetingLocation: item.meetingLocation,
                meetingDescription: item.meetingDescription,
                meetingStart: item.meetingStart,
                meetingEnd: item.meetingEnd,
                check: item.meetingDescription ?  true : false
            })
        })
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue })
    }

    handleStart = date => this.setState({meetingStart: date})
    handleEnd = date => this.setState({meetingEnd: date})


    handleSubmit(e) {
        e.preventDefault()

        const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}`)
        ref.update({
            meetingLocation: this.state.meetingLocation,
            meetingDescription: this.state.meetingDescription,
            meetingStart: this.state.meetingStart,
            meetingEnd: this.state.meetingEnd,
        })

        this.setState({check: !this.state.check})

        navigate(`/meetings/${this.props.userID}/${this.props.meetingID}`)

    }

    render() {
        let calendars = [
            { outlook: 'Outlook' },
            { google: 'Google' },
            { apple: 'Apple Calendar' }
         ];

         let event = {
            title: this.state.meetingName,
            description: this.state.meetingDescription,
            location: this.state.meetingLocation,
            startTime: this.state.meetingStart,
            endTime: this.state.meetingEnd
        }

        return(
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card bg-light">
                        <div className="card-body">
                            <h3 className="font-weight-light mb-3">Meeting: {this.state.meetingName}</h3>
                            <section className="form-group">
                            <label
                                className="form-control-label sr-only"
                                htmlFor="meetingDescription">
                                Description
                            </label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                id="meetingDescription"
                                name="meetingDescription"
                                placeholder="Description"
                                onChange={this.handleChange}
                                value={this.state.meetingDescription}
                            />
                            </section>
                            <section className="form-group">
                            <label
                                className="form-control-label sr-only"
                                htmlFor="meetingLocation">
                                Location
                            </label>
                            <input
                                required
                                className="form-control"
                                type="text"
                                id="meetingLocation"
                                name="meetingLocation"
                                placeholder="Location"
                                onChange={this.handleChange}
                                value={this.state.meetingLocation}
                            />
                            
                            </section>
                            <section className="form-group">
                            <label
                                className="form-control-label sr-only"
                                htmlFor="meetingStart">
                                Start time
                            </label>
                            <DatePicker
                                required
                                className="form-control"
                                name="meetingStart"
                                placeholderText="Select start time"
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                                showTimeSelect
                                onChange={this.handleStart}
                                selected={this.state.meetingStart}
                            />
                            
                            
                            </section>
                            <section className="form-group">
                            <label
                                className="form-control-label sr-only"
                                htmlFor="meetingEnd">
                                End time
                            </label>
                            <DatePicker
                                required
                                className="form-control"
                                name="meetingEnd"
                                placeholderText="Select end time"
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                timeCaption="time"
                                showTimeSelect
                                onChange={this.handleEnd}
                                selected={this.state.meetingEnd}
                            />
                           
                            
                            </section>
                            <div className="form-group mb-0">
                            { this.state.check ?  
                                <AddToCalendar 
                                event={event}
                                listItems={calendars} 
                                buttonLabel="Add to Calendar"
                                />
                            : <button className="btn btn-primary">Add Event</button>
                            }
                            
                          
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </form>
        )
    }

}

export default MeetingInfo