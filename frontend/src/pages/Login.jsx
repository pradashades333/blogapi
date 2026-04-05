import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
        fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
        })
        .then(res => res.json()).then(data => localStorage.setItem('token', data.token))
    }



    return (
        <div style={{ backgroundColor: 'lightblue', padding: '20px' }}>
            <h1 style={{ color: 'navy', textAlign: 'center' }}>Login</h1>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', border: '2px solid navy', padding: '10px' }}>
                <label>Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginLeft: '5px', marginBottom: '10px' }}/>
                </label>
                <br />
                <label>Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginLeft: '5px', marginBottom: '10px' }} />
                </label>
                <br />
                <button type="submit" style={{ backgroundColor: 'navy', color: 'white', padding: '5px 10px' }}>Log-in</button>
            </form>
        </div>
    )

}

export default Login;