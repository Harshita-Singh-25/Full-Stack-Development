// src/components/RoomList.jsx
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export default function RoomList() {
  const rooms = [
    { id: 1, name: 'Data Structures & Algorithms', topic: 'DSA Fundamentals', members: 12, status: 'Active', lastActivity: '2 mins ago' },
    { id: 2, name: 'System Design Masterclass', topic: 'Architecture & Scalability', members: 18, status: 'Active', lastActivity: '5 mins ago' },
    { id: 3, name: 'JavaScript Deep Dive', topic: 'Web Development', members: 15, status: 'Active', lastActivity: '15 mins ago' },
    { id: 4, name: 'Python for Interviews', topic: 'Coding Practice', members: 22, status: 'Active', lastActivity: '1 hour ago' },
    { id: 5, name: 'Mock Interview Sessions', topic: 'Interview Prep', members: 8, status: 'Scheduled', lastActivity: 'Starting at 3 PM' },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Study Rooms</h2>
        <Button variant="outline">View All</Button>
      </div>
      <div className="space-y-4">
        {rooms.map(room => (
          <Link 
            key={room.id} 
            to={`/room/${room.id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900">{room.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    room.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {room.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{room.topic}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>{room.members} members</span>
                  <span>•</span>
                  <span>{room.lastActivity}</span>
                </div>
              </div>
              <div className="ml-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline" className="w-full">
          + Join More Study Rooms
        </Button>
      </div>
    </div>
  );
}