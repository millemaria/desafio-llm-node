'use client';

import React from 'react';
import { Task, deleteTask } from '@/lib/api';
import Link from 'next/link';

interface TaskCardProps {
  task: Task;
  onDeleted: () => void;
}

const TaskCard = ({ task, onDeleted }: TaskCardProps) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await deleteTask(task.id);
        onDeleted();
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir tarefa.');
      }
    }
  };

  return (
    <div className="glass fade-in pulse" style={{ 
      padding: '1.5rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      position: 'relative',
      height: '100%'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={`badge badge-${task.lang}`}>
          {task.lang}
        </span>
        <button 
          onClick={handleDelete}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--error)', 
            cursor: 'pointer',
            padding: '4px',
            opacity: 0.6,
            transition: 'opacity 0.2s'
          }}
          title="Excluir"
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
        >
          🗑️
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>
          ID: {task.id}
        </h3>
        <p style={{ 
          fontSize: '0.9rem', 
          opacity: 0.7, 
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          {task.text}
        </p>
        
        {task.summary ? (
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.05)', 
            padding: '1rem', 
            borderRadius: '8px',
            borderLeft: '3px solid var(--primary)'
          }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.25rem', color: 'var(--primary)' }}>
              Resumo:
            </p>
            <p style={{ 
              fontSize: '0.85rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {task.summary}
            </p>
          </div>
        ) : (
          <p style={{ fontSize: '0.85rem', fontStyle: 'italic', opacity: 0.5 }}>
            Processando resumo...
          </p>
        )}
      </div>

      <Link 
        href={`/tasks/${task.id}`}
        style={{ 
          marginTop: '1rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}
      >
        Ver Detalhes <span>→</span>
      </Link>
    </div>
  );
};

export default TaskCard;
