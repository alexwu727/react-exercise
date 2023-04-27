import React from 'react'

const User = ({ user }) => {
    return (
        <div className='user'>
            <img src={user.avatar} alt={user.first_name} />
            <div className='info'>
                <p>Name: {user.first_name} {user.last_name}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    )
}

export default User