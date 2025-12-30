import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ 
        full_name: '', email: '', password: '', confirmPassword: '' 
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // CLEAN CODE: No citation tags here
        if (formData.password !== formData.confirmPassword) { 
            return alert("Passwords do not match");
        }
        try {
            await axios.post('http://localhost:5000/api/auth/signup', {
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password
            });
            alert("Signup successful! Please login.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" placeholder="Full Name" required 
                    onChange={e => setFormData({...formData, full_name: e.target.value})}
                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <input 
                    type="email" placeholder="Email" required 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <input 
                    type="password" placeholder="Password (min 8 chars)" required minLength="8"
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <input 
                    type="password" placeholder="Confirm Password" required 
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
                />
                <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Register</button>
            </form>
        </div>
    );
};
export default Signup;