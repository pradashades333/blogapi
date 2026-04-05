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
        <form onSubmit={handleSubmit}>
            <label>Email:
                <input type = "email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>Username:
                <input type = "text" value = {username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>Password:
                <input type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type = "submit" > Log-in</button>

        </form>
    )

}

export default Register;