"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { Task, TaskInput } from '@/app/types'; // Single source of truth
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const createTask = async (taskData: TaskInput) => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', taskData);
      setTasks([...tasks, response.data]);
      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id: string, taskData: TaskInput) => {
    try {
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, taskData);
      setTasks(
        tasks.map((task) => (task._id === id ? response.data : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitTask = async (taskData: TaskInput) => {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
    } else {
      await createTask(taskData);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm
        onSubmitTask={onSubmitTask}
        editingTask={editingTask}
        clearEditing={() => setEditingTask(null)}
      />
      <TaskList
        tasks={tasks}
        onEdit={(task: Task) => setEditingTask(task)}
        onDelete={deleteTask}
      />
      <Chatbot />
    </div>
  );
};

export default App;