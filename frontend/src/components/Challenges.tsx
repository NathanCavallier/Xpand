import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { challenges } from '../models/types';

function Challenges() {
    const [challenges, setChallenges] = useState<challenges[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/challenges')
            .then(response => setChallenges(response.data))
            .catch(error => console.error('Error fetching challenges:', error));
    }, []);

    return (
        <div>
            <h1>Challenges</h1>
            <ul>
                {challenges.map(challenge => (
                    <li key={challenge.id}>
                        <h2>{challenge.name}</h2>
                        <p>{challenge.image}</p>
                        <p>{challenge.description}</p>
                        <p>{challenge.reward}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Challenges;