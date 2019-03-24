import React from 'react'
import { Link } from '@reach/router'


class Welcome extends React.Component {

    render() {

        const {user} = this.props;

        return(
            <div className="mt-4 text-center">
                Welcome<span className="text-secondary font-weight-bold pl-1">{user}</span>,
                <Link className="font-weight-bold text-primary pl-1" to='/'>log out</Link>
            </div>
        )
    }

}

export default Welcome