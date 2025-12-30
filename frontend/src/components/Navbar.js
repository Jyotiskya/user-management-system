import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return null;

    return (
        <nav style={{ padding: '1rem', background: '#eee', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                {user.role === 'admin' && <Link to="/dashboard" style={{ marginRight: '1rem' }}>Admin Dashboard</Link>}
                <Link to="/profile">Profile</Link>
            </div>
            <div>
                <span style={{ marginRight: '1rem' }}>Hello, {user.full_name}</span>
                <button onClick={logout}>Logout</button>
            </div>
        </nav>
    );
};
export default Navbar;