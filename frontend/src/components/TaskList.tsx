'use client';

import React from 'react';
import { Task } from '@/lib/api';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onTaskDeleted: () => void;
}

const TaskList = ({ tasks, onTaskDeleted }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="glass fade-in" style={{ padding: '4rem', textAlign: 'center', opacity: 0.6 }}>
        <p style={{ fontSize: '1.2rem' }}>Nenhuma tarefa encontrada.</p>
        <p style={{ fontSize: '0.9rem' }}>Comece criando uma nova sumarização acima!</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '1.5rem' 
    }}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDeleted={onTaskDeleted} />
      ))}
    </div>
  );
};

export default TaskList;
