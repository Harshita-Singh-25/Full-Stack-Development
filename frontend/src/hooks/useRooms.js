// src/hooks/useRooms.js
import { useState, useEffect } from 'react';

export function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Replace with actual API call
        const mockRooms = [
          { id: 1, name: 'Data Structures & Algorithms', topic: 'DSA Fundamentals', members: 15 },
          { id: 2, name: 'System Design Masterclass', topic: 'Architecture', members: 8 },
          { id: 3, name: 'JavaScript Deep Dive', topic: 'Web Development', members: 12 },
        ];
        setRooms(mockRooms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const createRoom = async (roomData) => {
    try {
      // Replace with actual API call
      const newRoom = {
        id: Date.now(),
        ...roomData,
        members: 1,
        createdAt: new Date().toISOString()
      };
      setRooms(prev => [newRoom, ...prev]);
      return newRoom;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { rooms, loading, error, createRoom };
}