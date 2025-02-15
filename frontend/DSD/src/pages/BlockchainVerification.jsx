import { useState } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const BlockchainVerification = () => {
  const [recordId, setRecordId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.get(`/blockchain/verify/${recordId}`);
      setVerificationResult(response.data);
      toast.success('Record verification completed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
      setVerificationResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Verify Medical Record</h2>
        
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="recordId" className="block text-sm font-medium text-gray-700">
              Record ID
            </label>
            <input
              type="text"
              id="recordId"
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter record ID to verify"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Verifying...' : 'Verify Record'}
          </button>
        </form>

        {verificationResult && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Result</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${verificationResult.verified ? 'text-green-600' : 'text-red-600'}`}>
                  {verificationResult.verified ? 'Verified' : 'Not Verified'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Timestamp:</span>
                <span className="font-medium">
                  {new Date(verificationResult.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Block Number:</span>
                <span className="font-medium">{verificationResult.blockNumber}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainVerification;