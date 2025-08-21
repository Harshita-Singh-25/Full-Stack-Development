import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing user on app load
  useEffect(() => {
    console.log('AuthProvider: Checking for existing user...');
    try {
      const savedUser = localStorage.getItem('studycollab_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setCurrentUser(userData);
        console.log('AuthProvider: Found existing user:', userData.username);
      }
    } catch (error) {
      console.error('AuthProvider: Error loading saved user:', error);
      localStorage.removeItem('studycollab_user');
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (userData) => {
    try {
      setError(null);
      console.log('AuthProvider: Logging in user:', userData.email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userWithTimestamp = {
        ...userData,
        loginTime: new Date().toISOString(),
        id: Date.now() // Simulate user ID
      };
      
      setCurrentUser(userWithTimestamp);
      localStorage.setItem('studycollab_user', JSON.stringify(userWithTimestamp));
      
      console.log('AuthProvider: User logged in successfully');
      return userWithTimestamp;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      setError(null);
      console.log('AuthProvider: Signing up user:', userData.email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const newUser = {
        ...userData,
        id: Date.now(),
        joinedDate: new Date().toISOString(),
        studyTime: 0,
        completedGoals: 0
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('studycollab_user', JSON.stringify(newUser));
      
      console.log('AuthProvider: User signed up successfully');
      return newUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    console.log('AuthProvider: Logging out user');
    setCurrentUser(null);
    setError(null);
    localStorage.removeItem('studycollab_user');
  };

  // Update user data
  const updateUser = (updates) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      localStorage.setItem('studycollab_user', JSON.stringify(updatedUser));
      console.log('AuthProvider: User updated:', updates);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateUser,
    loading,
    error,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}