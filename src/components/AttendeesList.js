import React from 'react'
import { GoTrashcan } from 'react-icons/go';
import firebase from '../components/Firebase'

class AttendeesList extends React.Component {
    constructor(props) {
        super(props)
        this.deleteAttendee = this.deleteAttendee.bind(this)
    }

    deleteAttendee = (e, whichMeeting, whichAttendee) => {
        e.preventDefault()
        const ref = firebase.database().ref(`meetings/${this.props.userID}/${whichMeeting}`)
        ref.remove();
    }

    render() {
        const admin = this.props.adminUser === this.props.userID ? true: false
        const {attendees} = this.props;
        const myAttendees = attendees.map(item => {
            return (
                <div className="row justify-content-center" key={item.attendeeID}>
                    <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1" >
                        <div className="card">
                            <div className={"card-body px-3 py-2 d-flex align-items-center" + (admin ? '' : 'justify-content-center') }>

                                {admin && (
                                    <div className="btn-group pr-2">
                                        <button className="btn btn-sm btn-outline-secondary" title="Delete Atendeed" onClick={e => this.deleteAttendee(e, this.props.meetingID, item.attendeeID)}>
                                        <GoTrashcan />
                                        </button>
                                    </div>
                                )}

                                <div>{item.attendeeName}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            )

        })

        return(
            <div className="text-center">
                {myAttendees}          
            </div>
        )
    }

}

export default AttendeesList