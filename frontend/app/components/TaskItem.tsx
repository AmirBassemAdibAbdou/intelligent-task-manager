"use client";

import React, { useState } from 'react';
import type { Task } from '@/app/types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(task);
  };
const handleSave = async () => {
  setIsEditing(false);
  const newTask = { ...editedTask, createdAt: new Date(), updatedAt: new Date() };
  await onEdit(newTask);
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="task-item">
      <div className="task-details">
        <h3>{isEditing ? (
          <input
            type="text"
            value={editedTask.title}
            name="title"
            onChange={handleChange}
          />
        ) : (
          task.title
        )}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
      </div>
      <div className="task-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
      {isEditing && (
        <div className="task-edit-actions">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;