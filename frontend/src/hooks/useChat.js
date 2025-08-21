// src/hooks/useChat.js
import { useState, useEffect, useRef } from 'react';

export function useChat(roomId) {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const messagesEndRef = useRef(null);

  console.log(`useChat: Initializing for room ${roomId}`);

  // Simulate WebSocket connection
  useEffect(() => {
    console.log('useChat: Simulating WebSocket connection');
    setConnectionStatus('Connecting');
    
    const timer = setTimeout(() => {
      setConnectionStatus('Connected');
      console.log('useChat: Connected to room', roomId);
    }, 1000);

    // Load existing messages for room
    const savedMessages = localStorage.getItem(`messages_${roomId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Load default messages
      const defaultMessages = [
        {
          id: 1,
          sender: 'Alex Johnson',
          text: 'Welcome to the study room! Ready to learn together?',
          time: '10:30 AM',
          avatar: 'AJ'
        },
        {
          id: 2,
          sender: 'Sam Wilson',
          text: 'Yes! I\'ve prepared some questions about data structures.',
          time: '10:32 AM',
          avatar: 'SW'
        }
      ];
      setMessages(defaultMessages);
    }

    return () => {
      clearTimeout(timer);
      setConnectionStatus('Disconnected');
    };
  }, [roomId]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = (messageText) => {
    if (!messageText.trim()) return;

    console.log('useChat: Sending message:', messageText);
    
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: messageText,
      time: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      avatar: 'YU'
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    // Save to localStorage
    localStorage.setItem(`messages_${roomId}`, JSON.stringify(updatedMessages));
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(`messages_${roomId}`);
  };

  return {
    messages,
    connectionStatus,
    sendMessage,
    clearMessages,
    messagesEndRef
  };
}
