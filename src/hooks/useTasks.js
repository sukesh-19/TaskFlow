
import { useState, useEffect, useCallback } from 'react';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  createTask,
  generateId,
} from '../utils/taskHelpers';

const STORAGE_KEY = 'taskflow-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState(() => loadTasksFromStorage(STORAGE_KEY));
  useEffect(() => {
    saveTasksToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  
  const addTask = useCallback((formData) => {
    const task = createTask(formData);
    setTasks(prev => [task, ...prev]);
    return task;
  }, []);

  
  const updateTask = useCallback((id, updates) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }, []);

  
  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }, []);

  
  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  
  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.completed));
  }, []);

  return {
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  };
}
