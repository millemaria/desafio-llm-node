'use client';

import React, { useState } from 'react';
import { createTask } from '@/lib/api';

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm = ({ onTaskCreated }: TaskFormProps) => {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('pt');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await createTask(text, lang);
      setText('');
      onTaskCreated();
    } catch (err) {
      setError('Erro ao criar tarefa. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass fade-in" style={{ padding: '2rem', marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 600 }}>Nova Sumarização</h2>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
          Texto para resumir
        </label>
        <textarea
          className="input-field"
          placeholder="Cole seu texto aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
            Idioma do resumo
          </label>
          <select 
            className="input-field" 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            style={{ height: '48px' }}
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !text.trim()}
          style={{ height: '48px', minWidth: '180px' }}
        >
          {loading ? 'Processando...' : 'Gerar Resumo'}
          {!loading && <span>✨</span>}
        </button>
      </div>

      {error && (
        <p style={{ color: 'var(--error)', marginTop: '1rem', fontSize: '0.875rem' }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default TaskForm;
