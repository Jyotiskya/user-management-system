import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/users/?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data.users);
            setTotalPages(res.data.pages);
        } catch (err) {
            alert("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        if(!window.confirm(`Are you sure you want to make user ${newStatus}?`)) return;

        try {
            await axios.patch(`http://localhost:5000/api/users/${id}/status`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUsers();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>User Management</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.full_name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{u.status}</td>
                            <td>
                                {u.role !== 'admin' && (
                                    <button onClick={() => toggleStatus(u.id, u.status)}>
                                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '1rem' }}>
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                <span style={{ margin: '0 1rem' }}>Page {page} of {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    );
};
export default Dashboard;