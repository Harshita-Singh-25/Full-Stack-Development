// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-xl font-bold">StudyCollab</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="hover:text-indigo-200 transition">
            Dashboard
          </Link>
          <Link to="/room/1" className="hover:text-indigo-200 transition">
            Study Rooms
          </Link>
          
          {/* Profile Link with Dropdown */}
          <div className="relative group">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center">
                {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block">{currentUser?.username || 'User'}</span>
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                👤 Your Profile
              </Link>
              <Link 
                to="/settings" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                ⚙️ Settings
              </Link>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="text-white border-white hover:bg-white hover:text-indigo-600 hidden md:block"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}