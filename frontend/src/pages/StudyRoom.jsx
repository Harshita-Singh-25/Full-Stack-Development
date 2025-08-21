// src/pages/StudyRoom.jsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function StudyRoom() {
  const { id } = useParams();
  
  // Dummy room data based on ID
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

  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alex Johnson', text: 'Good morning everyone! Today we\'ll be focusing on binary trees. Has everyone completed yesterday\'s practice problems?', time: '09:30 AM', avatar: 'AJ' },
    { id: 2, sender: 'Sam Wilson', text: 'Yes! I solved the binary tree traversal problems. The iterative approach was tricky at first.', time: '09:32 AM', avatar: 'SW' },
    { id: 3, sender: 'Taylor Smith', text: 'I\'m still struggling with the recursive approach. Can someone explain the base case again?', time: '09:35 AM', avatar: 'TS' },
    { id: 4, sender: 'Alex Johnson', text: 'Sure! The base case is when we reach a null node. Let me share a code snippet...', time: '09:37 AM', avatar: 'AJ' },
    { id: 5, sender: 'Maria Garcia', text: 'I\'ve added a visualization tool to our resources. It really helps understand tree traversals!', time: '09:40 AM', avatar: 'MG' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const members = [
    { id: 1, name: 'Alex Johnson', role: 'Moderator', status: 'online', avatar: 'AJ' },
    { id: 2, name: 'Sam Wilson', role: 'Member', status: 'online', avatar: 'SW' },
    { id: 3, name: 'Taylor Smith', role: 'Member', status: 'online', avatar: 'TS' },
    { id: 4, name: 'Maria Garcia', role: 'Member', status: 'away', avatar: 'MG' },
    { id: 5, name: 'David Lee', role: 'Member', status: 'offline', avatar: 'DL' },
    { id: 6, name: 'Sarah Brown', role: 'Member', status: 'online', avatar: 'SB' },
  ];

  const resources = [
    { id: 1, name: 'Binary Tree Visualizer', url: '#', addedBy: 'Maria', type: 'tool', icon: '🔧' },
    { id: 2, name: 'DSA Cheat Sheet', url: '#', addedBy: 'Alex', type: 'document', icon: '📄' },
    { id: 3, name: 'Tree Traversal Practice', url: '#', addedBy: 'Sam', type: 'exercise', icon: '💻' },
    { id: 4, name: 'Big-O Complexity Guide', url: '#', addedBy: 'Taylor', type: 'reference', icon: '📊' },
  ];

  const [goals] = useState([
    { id: 1, text: 'Solve 2 tree problems', completed: true },
    { id: 2, text: 'Understand DFS vs BFS', completed: false },
    { id: 3, text: 'Implement binary search', completed: false },
  ]);

  const [studyTime, setStudyTime] = useState({ minutes: 25, seconds: 0 });
  const [timerActive, setTimerActive] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'YU'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Room Info */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm text-green-600 font-medium">Live Session</span>
            </div>
            <h2 className="text-xl font-bold mb-1">{room.name}</h2>
            <p className="text-indigo-600 font-medium mb-2">{room.topic}</p>
            <p className="text-sm text-gray-500 mb-4">{room.description}</p>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">Join Voice</Button>
              <Button variant="outline" size="sm">Share Screen</Button>
            </div>
          </div>
          
          {/* Members */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3 flex items-center justify-between">
              Members ({members.length})
              <span className="text-sm text-green-600">{members.filter(m => m.status === 'online').length} online</span>
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {members.map(member => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-medium">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Resources */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Resources</h3>
              <Button variant="ghost" size="sm">+ Add</Button>
            </div>
            <div className="space-y-2">
              {resources.map(resource => (
                <a 
                  key={resource.id} 
                  href={resource.url} 
                  className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded text-sm group"
                >
                  <span className="text-lg">{resource.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate group-hover:text-indigo-600">{resource.name}</p>
                    <p className="text-xs text-gray-500">Added by {resource.addedBy}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="lg:w-2/4 bg-white rounded-xl shadow flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center justify-between">
              Discussion
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>6 active</span>
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
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{message.text}</p>
                    <div className="flex items-center space-x-4 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs text-gray-400 hover:text-indigo-600">Reply</button>
                      <button className="text-xs text-gray-400 hover:text-indigo-600">React</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t flex space-x-2">
            <Input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
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
          
          {/* Study Timer */}
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
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - 0.6)}`}
                    className="text-indigo-600"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl font-mono font-bold text-gray-900">
                    {String(studyTime.minutes).padStart(2, '0')}:{String(studyTime.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-2">
                <Button 
                  size="sm" 
                  onClick={() => setTimerActive(!timerActive)}
                  className={timerActive ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  {timerActive ? 'Pause' : 'Start'}
                </Button>
                <Button variant="outline" size="sm">Reset</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button className="p-2 text-center bg-indigo-50 text-indigo-600 rounded font-medium">
                Pomodoro<br/>25m
              </button>
              <button className="p-2 text-center bg-gray-50 text-gray-600 rounded">
                Short<br/>5m
              </button>
              <button className="p-2 text-center bg-gray-50 text-gray-600 rounded">
                Long<br/>15m
              </button>
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
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Create Whiteboard
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Share Notes
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10M9 12h6" />
                </svg>
                Start Poll
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}