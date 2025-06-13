export async function obtenerTareaConIA() {
  const res = await fetch('/api/openai');
  if (!res.ok) throw new Error('Error en servidor');
  const data = await res.json();
  return data.suggestion || 'No se obtuvo sugerencia.';
}
