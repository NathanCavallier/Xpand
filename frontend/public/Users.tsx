import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { User } from '../../frontend/src/models/types';


function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <p>{user.profilePic}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
