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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patient/register" element={<PatientRegister />} />
            <Route path="/patient/login" element={<PatientLogin />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/patient/records" element={<PatientRecords />} />
            <Route path="/doctor/records" element={
              <PrivateRoute role="doctor">
                <DoctorViewRecords />
              </PrivateRoute>
            } />
            <Route path="/upload" element={
                <UploadRecord />
            } />
          </Routes>
        </div>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;