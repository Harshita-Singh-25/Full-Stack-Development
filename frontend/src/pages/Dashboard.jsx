// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import RoomList from '../components/RoomList';
import GoalTracker from '../components/GoalTracker';
import ProgressChart from '../components/ProgressChart';
import CreateRoomDialog from '../components/CreateRoomDialog';

export default function Dashboard() {
  // Dummy user data
  const user = { username: 'JohnDoe', email: 'john@example.com' };
  const [openCreateRoom, setOpenCreateRoom] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, <span className="text-indigo-600">{user.username}</span>
        </h1>
        <Button onClick={() => setOpenCreateRoom(true)}>
          Create Room
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Weekly Progress</h2>
            <ProgressChart />
          </div>
          
          <RoomList />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <GoalTracker />
          
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Rooms</h2>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h3 className="font-medium">System Design Masters</h3>
                <p className="text-sm text-gray-500">45 members</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h3 className="font-medium">Leetcode Daily</h3>
                <p className="text-sm text-gray-500">128 members</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h3 className="font-medium">Mock Interview Prep</h3>
                <p className="text-sm text-gray-500">67 members</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateRoomDialog open={openCreateRoom} onOpenChange={setOpenCreateRoom} />
    </div>
  );
}