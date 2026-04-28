const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

export interface Task {
  id: number;
  text: string;
  summary?: string;
  lang: string;
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function fetchTaskById(id: number): Promise<Task> {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  if (!response.ok) throw new Error('Failed to fetch task');
  return response.json();
}

export async function createTask(text: string, lang: string): Promise<{ message: string; task: Task }> {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang }),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
}
