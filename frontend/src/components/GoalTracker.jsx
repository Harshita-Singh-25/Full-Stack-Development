// src/components/GoalTracker.jsx
import { useState } from 'react';
import { Button } from './ui/Button';

export default function GoalTracker() {
  const [goals, setGoals] = useState([
    { id: 1, text: 'Solve 3 Leetcode problems', completed: true, priority: 'high' },
    { id: 2, text: 'Review system design concepts', completed: false, priority: 'medium' },
    { id: 3, text: 'Complete 1 mock interview', completed: false, priority: 'high' },
    { id: 4, text: 'Read about microservices', completed: true, priority: 'low' },
    { id: 5, text: 'Practice SQL queries', completed: false, priority: 'medium' },
  ]);

  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { 
        id: Date.now(), 
        text: newGoal, 
        completed: false,
        priority: 'medium'
      }]);
      setNewGoal('');
    }
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const completedCount = goals.filter(goal => goal.completed).length;
  const progressPercentage = (completedCount / goals.length) * 100;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-400';
      case 'medium': return 'border-l-yellow-400';
      case 'low': return 'border-l-green-400';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daily Goals</h2>
        <div className="text-sm text-gray-500">
          {completedCount}/{goals.length} completed
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {goals.map(goal => (
          <div key={goal.id} className={`flex items-center p-3 border-l-4 rounded-r ${getPriorityColor(goal.priority)} bg-gray-50`}>
            <input
              type="checkbox"
              checked={goal.completed}
              onChange={() => toggleGoal(goal.id)}
              className="mr-3 h-4 w-4 text-indigo-600 rounded"
            />
            <span className={`flex-1 ${goal.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
              {goal.text}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              goal.priority === 'high' ? 'bg-red-100 text-red-800' :
              goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {goal.priority}
            </span>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          placeholder="Add a new goal..."
          className="flex-grow border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={addGoal} size="sm">Add</Button>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{completedCount}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">{goals.length - completedCount}</div>
            <div className="text-xs text-gray-500">Remaining</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">7</div>
            <div className="text-xs text-gray-500">This Week</div>
          </div>
        </div>
      </div>
    </div>
  );
}