import React from 'react';


function UserInfoScreen(props) {

    return (
        <div className="details-info">
            <h4>Details</h4>
                <ul>
                    <li>
                        Name: <b>{props.location.aboutProps.name}</b>
                    </li>
                    <li>
                        Email: <b>{props.location.aboutProps.email}</b>
                    </li>
                    <li>
                        Phone Number: <b>{props.location.aboutProps.phoneNumber}</b>
                    </li>
                    <li>
                        Role: <b>{props.location.aboutProps.role}</b>
                    </li>
                </ul>
        </div>
    )
}



export default UserInfoScreen;