// src/components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
}