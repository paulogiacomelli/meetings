import React from 'react'

class AttendeesList extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {attendees} = this.props;
        const myAttendees = attendees.map(item => {
            return (
                <div className="row justify-content-center">
                    <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1" key={item.attendeeID}>
                        <div className="card">
                            <div className="card-body px-3 py-2 d-flex align-items-center justify-content-center">
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