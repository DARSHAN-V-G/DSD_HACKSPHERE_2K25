import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Health App</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/patient/login" className="text-white">Patient Login</Link>
              <Link to="/doctor/login" className="text-white">Doctor Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;