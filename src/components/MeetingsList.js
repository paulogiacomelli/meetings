import React from 'react'
import firebase from '../components/Firebase'
import { GoTrashcan, GoListUnordered, GoPin, GoCalendar } from 'react-icons/go'
import { FaLink } from 'react-icons/fa'
import { navigate } from '@reach/router';

class MeetingsList extends React.Component {

    constructor(props) {
        super(props)
        this.deleteMeeting = this.deleteMeeting.bind(this)
    }

    deleteMeeting = (e, whichMeeting) => {
        e.preventDefault()
        const ref = firebase.database().ref(`meetings/${this.props.userID}/${whichMeeting}`)
        ref.remove();
    }

    pinMeeting = (e, whichMeeting, pin) => {
        e.preventDefault()
        const ref = firebase.database().ref(`meetings/${this.props.userID}/${whichMeeting}/pin`)
        if (pin === undefined) {
            ref.set(true)
        } else {
            ref.set(!pin)
        }
    }

    // viewAgenda = (e, whichMeeting) => {
    //     e.preventDefault()
    //     const ref = firebase.database().ref(`meetings/${this.props.userID}/${whichMeeting}/agenda`)
    //     console.log(ref)
    //     if (pin === undefined) {
    //         ref.set(true)
    //     } else {
    //         ref.set(!pin)
    //     }
    // }

    render() {

        const {meetings} = this.props;
        const pinned = meetings.sort(function(a,b) {
            return b.pin - a.pin
        })

        const myMeetings = pinned.map(item => {
            return (
                <div className="list-group-item d-flex" key={item.meetingID}>
                    <section className="btn-group align-self-center" role="group" aria-label="Meeting Options">
                        <button 
                        className={"btn btn-sm "  + (item.pin ? 'btn-info' : 'btn-outline-secondary')} 
                        title="Pin Meeting" 
                        onClick={e => this.pinMeeting(e, item.meetingID, item.pin)}>
                        <GoPin />
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" title="Delete Meeting" onClick={e => this.deleteMeeting(e, item.meetingID)}>
                        <GoTrashcan />
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" title="Check In" onClick={() => navigate(`/checkin/${this.props.userID}/${item.meetingID}`)}>
                        <FaLink />
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" title="Attendees List" onClick={() => navigate(`/attendees/${this.props.userID}/${item.meetingID}`)}>
                        <GoListUnordered />
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" title="Meeting Information" onClick={() => navigate(`/meetings/${this.props.userID}/${item.meetingID}`)}>
                        <GoCalendar />
                        </button>
                        
                    </section>
                    <section className="pl-3 text-left align-self-center">
                        {item.meetingName}      
                    </section>
                    
                </div>
            )

        })

        return(
            <div className="text-center">
                {myMeetings}          
            </div>
        )
    }

}

export default MeetingsList