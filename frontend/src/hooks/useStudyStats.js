// src/hooks/useStudyStats.js
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useStudyStats() {
  const { currentUser, updateUser } = useAuth();
  const [stats, setStats] = useState({
    totalStudyTime: 0,
    sessionsCompleted: 0,
    goalsAchieved: 0,
    streak: 0,
    weeklyProgress: []
  });

  useEffect(() => {
    if (currentUser) {
      console.log('useStudyStats: Loading user stats');
      // Load stats from user data or localStorage
      const savedStats = localStorage.getItem(`stats_${currentUser.id}`);
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    }
  }, [currentUser]);

  const addStudySession = (minutes) => {
    console.log(`useStudyStats: Adding ${minutes} minutes to study time`);
    const newStats = {
      ...stats,
      totalStudyTime: stats.totalStudyTime + minutes,
      sessionsCompleted: stats.sessionsCompleted + 1
    };
    
    setStats(newStats);
    
    if (currentUser) {
      localStorage.setItem(`stats_${currentUser.id}`, JSON.stringify(newStats));
      updateUser({ totalStudyTime: newStats.totalStudyTime });
    }
  };

  const completeGoal = () => {
    console.log('useStudyStats: Goal completed');
    const newStats = {
      ...stats,
      goalsAchieved: stats.goalsAchieved + 1
    };
    
    setStats(newStats);
    
    if (currentUser) {
      localStorage.setItem(`stats_${currentUser.id}`, JSON.stringify(newStats));
    }
  };

  return {
    stats,
    addStudySession,
    completeGoal
  };
}
