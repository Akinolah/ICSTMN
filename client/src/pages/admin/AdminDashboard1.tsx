import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface AdminReport {
  adminIndex: number;
  name: string;
  email: string;
  eventsManaged: number;
  contentsUploaded: number;
  lastActive: string;
}

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

const AdminDashboard1: React.FC = () => {
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all admin reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError('');
      try {
        // You should secure this endpoint with JWT in production!
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE}/admin/reports`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReports(res.data.reports);
      } catch (err: any) {
        setError('Failed to load admin reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Super Admin Dashboard</h1>
      <p className="mb-8 text-gray-600">You have access to manage all admin functions and view their reports.</p>

      {loading && <div>Loading reports...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">Admin</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Events Managed</th>
                <th className="py-3 px-4 border-b text-left">Contents Uploaded</th>
                <th className="py-3 px-4 border-b text-left">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((admin) => (
                <tr key={admin.adminIndex}>
                  <td className="py-2 px-4 border-b">{admin.name}</td>
                  <td className="py-2 px-4 border-b">{admin.email}</td>
                  <td className="py-2 px-4 border-b">{admin.eventsManaged}</td>
                  <td className="py-2 px-4 border-b">{admin.contentsUploaded}</td>
                  <td className="py-2 px-4 border-b">{admin.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>  
        </div>
      )}
,
      {/* You can add more management features here, such as links to manage events, contents, users, etc. */}
    </div>
  );
};

export default AdminDashboard1;