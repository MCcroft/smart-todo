import React, { useState } from 'react';
import { useTodoStore } from './store';
import { obtenerTareaConIA } from './ai';

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input.trim());
      setInput('');
      setError(null);
    } else {
      setError('Por favor escribe una tarea.');
    }
  };

  const handleSugerenciaIA = async () => {
    setLoading(true);
    setError(null);
    try {
      const tarea = await obtenerTareaConIA();
      addTodo(`🧠 IA sugiere: ${tarea}`);
    } catch {
      setError('Error al obtener sugerencia IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Smart To‑Do</h1>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Escribe tu tarea..."
      />
      <button onClick={handleAdd} disabled={loading}>Agregar</button>
      <button onClick={handleSugerenciaIA} disabled={loading}>
        {loading ? 'Cargando...' : 'Sugerencia IA'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {todos.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}
