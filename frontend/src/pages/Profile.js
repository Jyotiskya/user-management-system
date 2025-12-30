import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import api from '../api';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({ full_name: user.full_name, email: user.email });

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await api.put('/api/users/profile', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated!");
            setIsEditing(false);
            window.location.reload(); // Quick refresh to update context
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
            <h2>My Profile</h2>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                <p><strong>Role:</strong> {user.role}</p>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label>Full Name: </label>
                    <input 
                        disabled={!isEditing}
                        value={data.full_name}
                        onChange={e => setData({...data, full_name: e.target.value})}
                    />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label>Email: </label>
                    <input 
                        disabled={!isEditing}
                        value={data.email}
                        onChange={e => setData({...data, email: e.target.value})}
                    />
                </div>

                {isEditing ? (
                    <>
                        <button onClick={handleUpdate} style={{ marginRight: '1rem' }}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
            </div>
        </div>
    );
};
export default Profile;