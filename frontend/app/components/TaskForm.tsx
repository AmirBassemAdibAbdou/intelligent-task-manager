"use client";

import React, { useState, useEffect } from 'react';
import type { Task, TaskInput } from '@/app/types';

interface TaskFormProps {
  onSubmitTask: (taskData: TaskInput) => void;
  editingTask: Task | null;
  clearEditing?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmitTask, editingTask, clearEditing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
    } else {
      setTitle('');
      setDescription('');
      setStatus('');
      setPriority('');
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData: TaskInput = {
      title,
      description,
      status,
      priority,
    };
    if (editingTask) {
      taskData.id = editingTask._id;
    }
    await onSubmitTask(taskData);
    if (clearEditing) {
      clearEditing();
    }
    setTitle('');
    setDescription('');
    setStatus('');
    setPriority('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
      />
      <input
        type="text"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        placeholder="Priority"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;