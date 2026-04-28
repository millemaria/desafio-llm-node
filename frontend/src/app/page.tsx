'use client';

import React, { useEffect, useState } from 'react';
import { fetchTasks, Task } from '@/lib/api';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data.sort((a, b) => b.id - a.id));
      setError(null);
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique se a API está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="container">
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="title-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          LLM Summarizer
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
          Gere resumos inteligentes e traduções instantâneas usando o poder do Qwen LLM.
        </p>
      </header>

      <section>
        <TaskForm onTaskCreated={loadTasks} />
      </section>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Histórico de Tarefas</h2>
          <button 
            onClick={loadTasks} 
            className="btn" 
            style={{ fontSize: '0.875rem', opacity: 0.8, background: 'rgba(255,255,255,0.05)' }}
          >
            🔄 Atualizar
          </button>
        </div>

        {error && (
          <div className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--error)', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--error)' }}>{error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <TaskList tasks={tasks} onTaskDeleted={loadTasks} />
        )}
      </section>

      <footer style={{ marginTop: '5rem', textAlign: 'center', opacity: 0.4, fontSize: '0.875rem' }}>
        <p>© 2026 LLM Summarizer API - Developed by Antigravity</p>
      </footer>
    </main>
  );
}
