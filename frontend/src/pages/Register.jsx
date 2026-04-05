import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
        fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password , username})
        })
        .then(() => navigate('/login'))
    }



    return (
        <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
            <h1 style={{ color: 'navy', textAlign: 'center' }}>Register</h1>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', border: '2px solid navy', padding: '10px' }}>
                <label>Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginLeft: '5px', marginBottom: '10px' }} />
                </label>
                <br />
                <label>Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginLeft: '5px', marginBottom: '10px' }} />
                </label>
                <br />
                <label>Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginLeft: '5px', marginBottom: '10px' }} />
                </label>
                <br />
                <button type="submit" style={{ backgroundColor: 'navy', color: 'white', padding: '5px 10px' }}>Register</button>
            </form>
        </div>
    )

}

export default Register;