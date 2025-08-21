// src/pages/StudyRoom.jsx - Enhanced with Custom Hooks
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { useTimer } from '../hooks/useTimer';
import { useChat } from '../hooks/useChat';
import { useOnlineUsers } from '../hooks/useOnlineUsers';
import { useStudyStats } from '../hooks/useStudyStats';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';

export default function StudyRoom() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { stats, addStudySession } = useStudyStats();
  
  // Custom hooks in action
  const { 
    time, 
    isActive, 
    isCompleted, 
    progress, 
    start, 
    pause, 
    reset, 
    formattedTime 
  } = useTimer(1500); // 25 minutes
  
  const { 
    messages, 
    connectionStatus, 
    sendMessage, 
    messagesEndRef 
  } = useChat(id);
  
  const { onlineUsers, userCount } = useOnlineUsers(id);
  
  // Local storage for room preferences
  const [roomPreferences, setRoomPreferences] = useLocalStorage(`room_prefs_${id}`, {
    notifications: true,
    autoScroll: true,
    showTimestamps: true
  });

  // Room data based on ID
  const roomData = {
    1: {
      name: 'Data Structures & Algorithms',
      topic: 'DSA Fundamentals',
      description: 'Daily problem solving sessions focusing on arrays, strings, trees, and graphs'
    },
    2: {
      name: 'System Design Masterclass',
      topic: 'Architecture & Scalability',
      description: 'Learn to design scalable systems with real-world examples'
    },
    3: {
      name: 'JavaScript Deep Dive',
      topic: 'Web Development',
      description: 'Advanced JavaScript concepts, closures, promises, and modern ES6+ features'
    }
  };

  const room = roomData[id] || roomData[1];
  const [newMessage, setNewMessage] = useState('');
  const [goals] = useState([
    { id: 1, text: 'Solve 2 tree problems', completed: true },
    { id: 2, text: 'Understand DFS vs BFS', completed: false },
    { id: 3, text: 'Implement binary search', completed: false },
  ]);

  // Handle timer completion
  useEffect(() => {
    if (isCompleted) {
      addStudySession(25); // Add 25 minutes to study stats
      console.log('Pomodoro session completed!');
      // Could show notification here
    }
  }, [isCompleted, addStudySession]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    sendMessage(newMessage);
    setNewMessage('');
  };

  const togglePreference = (key) => {
    setRoomPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Debug Info - Show in lab to demonstrate hooks */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
        <h4 className="font-semibold text-blue-800 mb-2">🔧 Hooks Debug Info (Remove in production)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-blue-600">
          <div>Timer: {formattedTime}</div>
          <div>Chat Status: {connectionStatus}</div>
          <div>Online Users: {userCount}</div>
          <div>Study Time: {stats.totalStudyTime}min</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Room Info */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'Connected' ? 'bg-green-400' : 'bg-yellow-400'
              }`}></div>
              <span className="text-sm text-green-600 font-medium">
                {connectionStatus === 'Connected' ? 'Live Session' : 'Connecting...'}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">{room.name}</h2>
            <p className="text-indigo-600 font-medium mb-2">{room.topic}</p>
            <p className="text-sm text-gray-500 mb-4">{room.description}</p>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">Join Voice</Button>
              <Button variant="outline" size="sm">Share Screen</Button>
            </div>
          </div>
          
          {/* Members - Using custom hook data */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3 flex items-center justify-between">
              Members ({onlineUsers.length})
              <span className="text-sm text-green-600">{userCount} online</span>
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {onlineUsers.map(member => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-medium">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{member.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Room Preferences - Using useLocalStorage */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3">Room Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={roomPreferences.notifications}
                  onChange={() => togglePreference('notifications')}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm">Enable notifications</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={roomPreferences.autoScroll}
                  onChange={() => togglePreference('autoScroll')}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm">Auto-scroll chat</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={roomPreferences.showTimestamps}
                  onChange={() => togglePreference('showTimestamps')}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span className="text-sm">Show timestamps</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Main Chat Area - Using useChat hook */}
        <div className="lg:w-2/4 bg-white rounded-xl shadow flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center justify-between">
              Discussion
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  connectionStatus === 'Connected' ? 'bg-green-400' : 'bg-yellow-400'
                }`}></div>
                <span>{connectionStatus}</span>
              </div>
            </h3>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto" style={{height: '500px'}}>
            {messages.map(message => (
              <div key={message.id} className="mb-4 group">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium mt-1">
                    {message.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-gray-900">{message.sender}</p>
                      {roomPreferences.showTimestamps && (
                        <p className="text-xs text-gray-500">{message.time}</p>
                      )}
                    </div>
                    <p className="text-gray-800 leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t flex space-x-2">
            <Input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={connectionStatus !== 'Connected'}
            />
            <Button 
              type="submit" 
              disabled={connectionStatus !== 'Connected' || !newMessage.trim()}
            >
              Send
            </Button>
          </form>
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Goals */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3 flex items-center justify-between">
              Today's Goals
              <span className="text-sm text-gray-500">{goals.filter(g => g.completed).length}/{goals.length}</span>
            </h3>
            <div className="space-y-3">
              {goals.map(goal => (
                <div key={goal.id} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-indigo-600 rounded" 
                    checked={goal.completed}
                    readOnly
                  />
                  <span className={goal.completed ? 'line-through text-gray-500 text-sm' : 'text-sm'}>
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              + Add Goal
            </Button>
          </div>
          
          {/* Enhanced Study Timer - Using custom useTimer hook */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3">Pomodoro Timer</h3>
            <div className="text-center py-4">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    className={`transition-all duration-1000 ${
                      isCompleted ? 'text-green-600' : 'text-indigo-600'
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl font-mono font-bold text-gray-900">
                    {formattedTime}
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-2 mb-3">
                <Button 
                  size="sm" 
                  onClick={isActive ? pause : start}
                  className={isActive ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button variant="outline" size="sm" onClick={reset}>
                  Reset
                </Button>
              </div>
              {isCompleted && (
                <div className="text-sm text-green-600 font-medium">
                  🎉 Session completed! Great job!
                </div>
              )}
            </div>
            
            {/* Study Stats from custom hook */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-indigo-600">{stats.totalStudyTime}</div>
                  <div className="text-xs text-gray-500">Total Minutes</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{stats.sessionsCompleted}</div>
                  <div className="text-xs text-gray-500">Sessions</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Code Collaboration */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3 flex items-center justify-between">
              Code Collaboration
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-500">Live</span>
              </div>
            </h3>
            <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm overflow-hidden">
              <div className="text-green-400 mb-1">// Binary Tree Traversal</div>
              <div className="text-blue-300">function <span className="text-yellow-300">inorderTraversal</span>(<span className="text-orange-300">root</span>) {'{'}</div>
              <div className="text-gray-300 ml-2">if (!root) return [];</div>
              <div className="text-gray-300 ml-2">let result = [];</div>
              <div className="text-purple-300 ml-2">// Traverse left subtree</div>
              <div className="text-gray-300 ml-2">result.push(...inorderTraversal(root.left));</div>
              <div className="text-gray-300 ml-2">result.push(root.val);</div>
              <div className="text-gray-300 ml-2">result.push(...inorderTraversal(root.right));</div>
              <div className="text-blue-300">{'}'}</div>
              <div className="text-gray-500 text-xs mt-2 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                Alex is editing...
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1">Join Code</Button>
              <Button variant="ghost" size="sm">Copy</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}