import React from 'react'
import { Link } from '@reach/router'


class Welcome extends React.Component {

    render() {

        const {userName,logoutUser} = this.props;

        return(
            <div className="mt-4 text-center">
                Welcome<span className="text-secondary font-weight-bold pl-1">{userName}</span>,
                <Link onClick={e => logoutUser(e)} className="font-weight-bold text-primary pl-1" to='/'>log out</Link>
            </div>
        )
    }

}

export default Welcome