// src/hooks/chat/useSocket.js
import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../auth/useAuth';
import io from 'socket.io-client';

export function useSocket() {
  const socketRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      socketRef.current = io(process.env.REACT_APP_SOCKET_URL, {
        auth: {
          token: localStorage.getItem('authToken')
        }
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to server');
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [currentUser]);

  const joinRoom = useCallback((roomId) => {
    if (socketRef.current) {
      socketRef.current.emit('join_room', roomId);
    }
  }, []);

  const leaveRoom = useCallback((roomId) => {
    if (socketRef.current) {
      socketRef.current.emit('leave_room', roomId);
    }
  }, []);

  const sendMessage = useCallback((messageData) => {
    if (socketRef.current) {
      socketRef.current.emit('send_message', messageData);
    }
  }, []);

  const onMessage = useCallback((handler) => {
    if (socketRef.current) {
      socketRef.current.on('receive_message', handler);
      
      return () => {
        if (socketRef.current) {
          socketRef.current.off('receive_message', handler);
        }
      };
    }
  }, []);

  return {
    joinRoom,
    leaveRoom,
    sendMessage,
    onMessage,
    isConnected: socketRef.current?.connected || false
  };
}