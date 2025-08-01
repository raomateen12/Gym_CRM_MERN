import React, { createContext, useContext, useState } from 'react';

const TrainerScheduleContext = createContext();

export const useTrainerSchedule = () => {
  const context = useContext(TrainerScheduleContext);
  if (!context) {
    throw new Error('useTrainerSchedule must be used within a TrainerScheduleProvider');
  }
  return context;
};

export const TrainerScheduleProvider = ({ children }) => {
  const [scheduledSessions, setScheduledSessions] = useState([]);

  const addScheduledSession = (sessionData) => {
    const newSession = {
      id: Date.now(),
      ...sessionData,
      createdAt: new Date().toISOString(),
      status: 'scheduled'
    };
    setScheduledSessions(prev => [...prev, newSession]);
    return newSession;
  };

  const getScheduledSessions = () => {
    return scheduledSessions;
  };

  const updateSession = (sessionId, updates) => {
    setScheduledSessions(prev => 
      prev.map(session => 
        session.id === sessionId ? { ...session, ...updates } : session
      )
    );
  };

  const deleteSession = (sessionId) => {
    setScheduledSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  return (
    <TrainerScheduleContext.Provider value={{
      scheduledSessions,
      addScheduledSession,
      getScheduledSessions,
      updateSession,
      deleteSession
    }}>
      {children}
    </TrainerScheduleContext.Provider>
  );
};
