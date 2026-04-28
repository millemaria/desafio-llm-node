'use client';

import React, { useEffect, useState, use } from 'react';
import { fetchTaskById, Task } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TaskDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadTask = async () => {
      try {
        setLoading(true);
        const data = await fetchTaskById(parseInt(id, 10));
        setTask(data);
      } catch (err) {
        setError('Tarefa não encontrada.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [id]);

  if (loading) return <main className="container"><LoadingSpinner /></main>;

  if (error || !task) {
    return (
      <main className="container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Ops! 404</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.7 }}>A tarefa que você procura não existe ou foi removida.</p>
        <Link href="/" className="btn btn-primary">Voltar para Home</Link>
      </main>
    );
  }

  return (
    <main className="container fade-in">
      <Link href="/" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
        ← Voltar
      </Link>

      <div className="glass" style={{ padding: '3rem', marginTop: '1rem' }}>
        <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Detalhes da Tarefa #{task.id}</h1>
            <span className={`badge badge-${task.lang}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {task.lang}
            </span>
          </div>
        </header>

        <div style={{ display: 'grid', gap: '3rem' }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--secondary)' }}>
              Texto Original
            </h2>
            <div style={{ 
              background: 'rgba(255,255,255,0.02)', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap'
            }}>
              {task.text}
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>
              Resumo Gerado
            </h2>
            {task.summary ? (
              <div style={{ 
                background: 'rgba(139, 92, 246, 0.05)', 
                padding: '2rem', 
                borderRadius: '12px', 
                lineHeight: '1.7',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                fontSize: '1.1rem',
                boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.2)'
              }}>
                {task.summary}
              </div>
            ) : (
              <div className="glass" style={{ padding: '2rem', textAlign: 'center', fontStyle: 'italic', opacity: 0.5 }}>
                O resumo ainda está sendo processado...
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
