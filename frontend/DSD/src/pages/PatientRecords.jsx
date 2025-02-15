import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PatientRecords = () => {
  const [records, setRecords] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await API.get(`/patients/${user._id}/records`);
        setRecords(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch records');
      }
    };
    
    if (user) fetchRecords();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl mb-4">Your Medical Records</h2>
      <div className="space-y-4">
        {records.map(record => (
          <div key={record._id} className="p-4 border rounded shadow">
            <h3 className="text-xl">{record.title}</h3>
            <p>{record.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(record.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientRecords;