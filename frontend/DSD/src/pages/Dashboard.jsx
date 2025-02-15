import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const menuItems = [
    {
      title: 'Medical Records',
      description: 'View and manage your medical records',
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: user?.role === 'doctor' ? '/doctor/records' : '/patient/records'
    },
    {
      title: 'Upload Record',
      description: 'Upload a new medical record',
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      link: '/upload'
    },
    {
      title: 'Verify Records',
      description: 'Verify the authenticity of medical records',
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      link: '/verify'
    },
    {
      title: 'Wearable Data',
      description: 'View your health metrics from wearable devices',
      icon: (
        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/wearable'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your medical records and health data securely
        </p>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-100">
                {item.icon}
              </div>
              <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {item.title}
              </h2>
              <p className="text-gray-600">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;