// src/components/ProtectedRoute.jsx - Updated to use useAuth hook
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  
  console.log('ProtectedRoute: Checking authentication...', { 
    currentUser: !!currentUser, 
    loading 
  });

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
          <p className="text-sm text-gray-400">Checking authentication status...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to auth page if not authenticated
  if (!currentUser) {
    console.log('ProtectedRoute: User not authenticated, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }
  
  console.log('ProtectedRoute: User authenticated, rendering protected content');
  return children;
}