import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            login(res.data.token, res.data.user);
            navigate(res.data.user.role === 'admin' ? '/dashboard' : '/profile');
        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    required 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Signup here</Link></p>
        </div>
    );
};
export default Login;