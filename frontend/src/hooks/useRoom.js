// src/hooks/rooms/useRooms.js
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchRooms();
    }
  }, [currentUser]);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/rooms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRooms(data.rooms);
      } else {
        setError('Failed to fetch rooms');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (roomData) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(roomData)
      });
      
      if (response.ok) {
        const newRoom = await response.json();
        setRooms(prev => [...prev, newRoom]);
        return { success: true, room: newRoom };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (err) {
      return { success: false, error: 'Network error' };
    }
  };

  const joinRoom = async (roomId) => {
    // Implementation for joining a room
  };

  const leaveRoom = async (roomId) => {
    // Implementation for leaving a room
  };

  return {
    rooms,
    loading,
    error,
    createRoom,
    joinRoom,
    leaveRoom,
    refetch: fetchRooms
  };
}