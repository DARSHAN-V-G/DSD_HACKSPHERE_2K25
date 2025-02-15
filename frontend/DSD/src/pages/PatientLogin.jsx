import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { toast } from 'react-toastify';

const PatientLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/patients/login', credentials);
      login(data.patient, data.token);
      toast.success('Login successful!');
      navigate('/patient/records');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Patient Login</h2>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Login
      </button>
    </form>
  );
};

export default PatientLogin;