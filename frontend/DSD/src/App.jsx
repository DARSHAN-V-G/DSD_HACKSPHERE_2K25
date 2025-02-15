import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientRegister from './pages/PatientRegister';
import PatientLogin from './pages/PatientLogin';
import PatientRecords from './pages/PatientRecords';
import DoctorLogin from './pages/DoctorLogin';
import DoctorViewRecords from './pages/DoctorViewRecords';
import UploadRecord from './pages/UploadRecord';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import BlockchainVerification from './pages/BlockchainVerification';
import WearableData from './pages/WearableData';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/patient/register" element={<PatientRegister />} />
              <Route path="/patient/login" element={<PatientLogin />} />
              <Route path="/doctor/login" element={<DoctorLogin />} />
              <Route path="/patient/records" element={
                <PrivateRoute role="patient">
                  <PatientRecords />
                </PrivateRoute>
              } />
              <Route path="/doctor/records" element={
                <PrivateRoute role="doctor">
                  <DoctorViewRecords />
                </PrivateRoute>
              } />
              <Route path="/upload" element={
                <PrivateRoute>
                  <UploadRecord />
                </PrivateRoute>
              } />
              <Route path="/verify" element={
                <PrivateRoute>
                  <BlockchainVerification />
                </PrivateRoute>
              } />
              <Route path="/wearable" element={
                <PrivateRoute>
                  <WearableData />
                </PrivateRoute>
              } />
            </Routes>
          </div>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App