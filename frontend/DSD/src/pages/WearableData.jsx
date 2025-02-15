import { useState, useEffect } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';
import GoogleFitAuth from '../components/GoogleFitAuth';
import GoogleFitData from '../components/GoogleFitData';

const WearableData = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsConnected(!!accessToken);
    if (accessToken) {
      fetchHealthData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchHealthData = async () => {
    try {
      const response = await API.get('/wearable/get-latest-data');
      setHealthData(response.data);
    } catch (error) {
      toast.error('Failed to fetch health data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Wearable Health Data</h2>
          <GoogleFitAuth />
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading health data...</p>
          </div>
        ) : isConnected ? (
          <div className="space-y-6">
            <GoogleFitData />
          </div>
        ) : (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No wearable connected</h3>
            <p className="mt-1 text-sm text-gray-500">
              Connect your Google Fit account to see your health data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WearableData;