// api/openai.js
import axios from 'axios';

export default async function handler(req, res) {
  const API_KEY = process.env.OPENAI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key no configurada" });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Sugiere una tarea corta para una To-Do List." }],
        max_tokens: 30,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const suggestion = response.data.choices[0].message.content.trim();
    res.status(200).json({ suggestion });
  } catch (error) {
    console.error("Error en openai api:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al obtener sugerencia" });
  }
}
