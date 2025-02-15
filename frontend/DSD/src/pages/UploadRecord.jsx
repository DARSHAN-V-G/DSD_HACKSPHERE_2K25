import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const UploadRecord = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    description: '',
    recordType: '',
    recordDate: ''
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    const data = new FormData();
    data.append('file', file);
    data.append('patientId', formData.patientId);
    data.append('metadata', JSON.stringify({
      title: formData.title,
      description: formData.description,
      recordType: formData.recordType,
      recordDate: formData.recordDate
    }));

    setLoading(true);
    try {
      const response = await API.post('/records/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success('Record uploaded successfully!');
      setFile(null);
      setFormData({
        patientId: '',
        title: '',
        description: '',
        recordType: '',
        recordDate: ''
      });
      
      // Redirect based on user role
      if (user.role === 'doctor') {
        navigate('/doctor/records');
      } else {
        navigate('/patient/records');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Upload failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size should not exceed 10MB');
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Upload Medical Record</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Patient ID</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Record Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.recordType}
            onChange={(e) => setFormData({ ...formData, recordType: e.target.value })}
            required
          >
            <option value="">Select type</option>
            <option value="lab_result">Lab Result</option>
            <option value="prescription">Prescription</option>
            <option value="imaging">Imaging</option>
            <option value="clinical_note">Clinical Note</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Record Date</label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.recordDate}
            onChange={(e) => setFormData({ ...formData, recordDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">File</label>
          <input
            type="file"
            required
            className="mt-1 block w-full"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.dcm"
          />
          <p className="mt-1 text-sm text-gray-500">
            Accepted formats: PDF, JPEG, PNG, DICOM. Max size: 10MB
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Uploading...' : 'Upload Record'}
      </button>
    </form>
  );
};

export default UploadRecord;