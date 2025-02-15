import { useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const DoctorViewRecords = () => {
  const [patientId, setPatientId] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.get(
        `/doctors/${user._id}/patient/${patientId}/records`
      );
      setRecords(data);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">View Patient Records</h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Patient ID"
            className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {records.length > 0 ? (
        <div className="space-y-4">
          {records.map(record => (
            <div key={record._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{record.metadata.title}</h3>
                <span className="text-sm text-gray-500">
                  {formatDate(record.metadata.recordDate)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{record.metadata.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Record Type:</span>
                  <span className="ml-2 text-gray-600">{record.metadata.recordType}</span>
                </div>
                <div>
                  <span className="font-medium">File Type:</span>
                  <span className="ml-2 text-gray-600">{record.metadata.fileType}</span>
                </div>
                <div>
                  <span className="font-medium">File Size:</span>
                  <span className="ml-2 text-gray-600">
                    {Math.round(record.metadata.fileSize / 1024)} KB
                  </span>
                </div>
                <div>
                  <span className="font-medium">Upload Date:</span>
                  <span className="ml-2 text-gray-600">
                    {formatDate(record.metadata.uploadDate)}
                  </span>
                </div>
              </div>
              
              {record.ipfsCID && (
                <div className="mt-4 pt-4 border-t">
                  <a
                    href={`https://ipfs.io/ipfs/${record.ipfsCID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    View Document
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          {patientId ? 'No records found' : 'Enter a patient ID to search for records'}
        </div>
      )}
    </div>
  );
};

export default DoctorViewRecords;