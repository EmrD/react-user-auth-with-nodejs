import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('');

    const registerUser = async () => {
        try {
            const response = await axios.post('https://react-user-auth-with-nodejs.vercel.app/register', { username });
            alert(`Code sent to your phone: ${response.data.code}`);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const verifyCode = async () => {
        try {
            await axios.post('https://react-user-auth-with-nodejs.vercel.app/verify', { username, code });
            setStatus('User verified successfully!');
        } catch (error) {
            setStatus('Invalid code or user');
        }
    };

    const checkStatus = async () => {
        try {
            const response = await axios.get(`https://react-user-auth-with-nodejs.vercel.app/status/${username}`);
            setStatus(response.data.registered ? 'User is registered' : 'User is not registered');
        } catch (error) {
            setStatus('User not found');
        }
    };

    return (
        <div>
            <h1>User Authentication</h1>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <button onClick={registerUser}>Register</button>
            <br />
            <input 
                type="text" 
                placeholder="Verification Code" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
            />
            <button onClick={verifyCode}>Verify</button>
            <br />
            <button onClick={checkStatus}>Check Status</button>
            <p>{status}</p>
        </div>
    );
};

export default App;
