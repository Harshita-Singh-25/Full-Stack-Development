// src/hooks/useOnlineUsers.js
import { useState, useEffect } from 'react';

export function useOnlineUsers(roomId) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    console.log(`useOnlineUsers: Fetching online users for room ${roomId}`);
    
    // Simulate fetching online users
    const mockUsers = [
      { id: 1, name: 'Alex Johnson', avatar: 'AJ', status: 'online' },
      { id: 2, name: 'Sam Wilson', avatar: 'SW', status: 'online' },
      { id: 3, name: 'Taylor Smith', avatar: 'TS', status: 'away' },
      { id: 4, name: 'Maria Garcia', avatar: 'MG', status: 'online' },
    ];

    setOnlineUsers(mockUsers);
    setUserCount(mockUsers.filter(user => user.status === 'online').length);
  }, [roomId]);

  const updateUserStatus = (userId, status) => {
    setOnlineUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status } : user
      )
    );
    
    setUserCount(onlineUsers.filter(user => user.status === 'online').length);
  };

  return {
    onlineUsers,
    userCount,
    updateUserStatus
  };
}