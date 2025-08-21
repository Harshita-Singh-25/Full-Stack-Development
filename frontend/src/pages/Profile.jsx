// src/pages/Profile.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { useStudyStats } from '../hooks/useStudyStats';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const { stats } = useStudyStats();
  const [userPreferences, setUserPreferences] = useLocalStorage('userPreferences', {
    emailNotifications: true,
    studyReminders: true,
    darkMode: false,
    autoJoinAudio: false,
    showOnlineStatus: true
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: currentUser?.username || '',
    bio: currentUser?.bio || '',
    skills: currentUser?.skills?.join(', ') || ''
  });

  // Sample study history data
  const studyHistory = [
    { date: '2023-10-15', topic: 'Data Structures', duration: 45, room: 'Algorithms Club' },
    { date: '2023-10-14', topic: 'React Hooks', duration: 30, room: 'Frontend Masters' },
    { date: '2023-10-12', topic: 'System Design', duration: 60, room: 'Architecture Guild' },
    { date: '2023-10-10', topic: 'JavaScript', duration: 25, room: 'JS Beginners' },
  ];

  const handleSaveProfile = () => {
    // In a real app, you would update the user profile via API
    console.log('Saving profile:', editForm);
    setIsEditing(false);
    // Update user context or make API call
  };

  const togglePreference = (key) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentUser?.username}</h2>
                  <p className="text-gray-600">{currentUser?.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Member since {currentUser?.joinedDate ? formatDate(currentUser.joinedDate) : '2023'}
                  </p>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editForm.username}
                      onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      placeholder="Tell us about yourself"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Input
                      id="skills"
                      value={editForm.skills}
                      onChange={(e) => setEditForm({...editForm, skills: e.target.value})}
                      placeholder="React, Node.js, Python, etc."
                    />
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentUser?.bio && (
                    <p className="text-gray-700">{currentUser.bio}</p>
                  )}
                  {currentUser?.skills && currentUser.skills.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button onClick={() => setIsEditing(true)} className="mt-4">
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>

            {/* Study Statistics */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-6">Study Statistics</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{stats.totalStudyTime}</div>
                  <div className="text-sm text-blue-800">Minutes Studied</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{stats.sessionsCompleted}</div>
                  <div className="text-sm text-green-800">Sessions Completed</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{studyHistory.length}</div>
                  <div className="text-sm text-purple-800">Study Rooms Joined</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">5</div>
                  <div className="text-sm text-yellow-800">Goals Achieved</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Recent Study Sessions</h4>
                <div className="space-y-3">
                  {studyHistory.map((session, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{session.topic}</p>
                        <p className="text-sm text-gray-500">{session.room}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{session.duration} min</p>
                        <p className="text-sm text-gray-500">{formatDate(session.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Preferences & Actions */}
          <div className="space-y-6">
            {/* Preferences */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Preferences</h3>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={userPreferences.emailNotifications}
                    onChange={() => togglePreference('emailNotifications')}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-sm font-medium">Email Notifications</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={userPreferences.studyReminders}
                    onChange={() => togglePreference('studyReminders')}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-sm font-medium">Study Reminders</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={userPreferences.darkMode}
                    onChange={() => togglePreference('darkMode')}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-sm font-medium">Dark Mode</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={userPreferences.autoJoinAudio}
                    onChange={() => togglePreference('autoJoinAudio')}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-sm font-medium">Auto-Join Audio</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={userPreferences.showOnlineStatus}
                    onChange={() => togglePreference('showOnlineStatus')}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-sm font-medium">Show Online Status</span>
                </label>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Account Actions</h3>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-center">
                  Change Password
                </Button>
                
                <Button variant="outline" className="w-full justify-center">
                  Export Data
                </Button>
                
                <Button variant="outline" className="w-full justify-center">
                  Help & Support
                </Button>
                
                <Button 
                  onClick={logout}
                  variant="outline" 
                  className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Achievements</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <p className="text-xs font-medium">5-Day Streak</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">📚</span>
                  </div>
                  <p className="text-xs font-medium">Bookworm</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">👥</span>
                  </div>
                  <p className="text-xs font-medium">Social Learner</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">💡</span>
                  </div>
                  <p className="text-xs font-medium">Problem Solver</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <p className="text-xs font-medium">Top Contributor</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <p className="text-xs font-medium">Goal Master</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}