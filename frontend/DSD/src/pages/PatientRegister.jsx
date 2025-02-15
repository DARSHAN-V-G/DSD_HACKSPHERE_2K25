import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/patients/register', formData);
      toast.success('Registration successful!');
      navigate('/patient/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Patient Registration</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Register
      </button>
    </form>
  );
};

export default PatientRegister;