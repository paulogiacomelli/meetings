import React from 'react'
import MeetingsList from '../components/MeetingsList'

class Meetings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meetingName: '',
            pin: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({ [itemName]: itemValue })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.addMeeting(this.state.meetingName)
        this.setState({meetingName: ''})
    }

    render() {

        return(
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-sm-8 text-center mb-4">
                    <h1 className="font-weight-light">Add a Meeting</h1>
                    <div className="card bg-light">
                        <div className="card-body text-center">
                        <form
                            className="form"
                            onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <input
                                    onChange={this.handleChange}
                                    value={this.state.meetingName}
                                    type="text"
                                    className="form-control"
                                    name="meetingName"
                                    placeholder="Meeting name"
                                    aria-describedby="buttonAdd"/>
                                    {/*<Geosuggest placeholder="Meeting location" inputClassName="form-control"/>*/}
                                <div className="input-group-append">
                                    <button
                                    type="submit"
                                    className="btn btn-info"
                                    id="buttonAdd">
                                    + Add Meeting
                                    </button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>

                <div className="col-11 col-md-6 text-center">
                    <div className="card border-0 rounded-0">
                        {this.props.meetings && this.props.meetings.length ? (
                            <div className='card-body py-2'>
                                <h4 className="card-title font-weight-light m-0">Your Meetings</h4>
                            </div> 
                        ) : null}
                        
                        {this.props.meetings && (
                            <div className="list-group list-group-flush">
                                <MeetingsList userID={this.props.userID} meetings={this.props.meetings} />
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
        )
    }

}

export default Meetings