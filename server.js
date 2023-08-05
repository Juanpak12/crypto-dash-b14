const express = require('express');
//const fetch = require('node-fetch');

let fetch;
(async () => {
  const fetchModule = await import('node-fetch');
  fetch = fetchModule.default;
})();

const app = express();
const PORT = 3001; // Puerto para el servidor proxy (puedes cambiarlo si lo deseas)
const axios = require('axios');

// Ejemplo de uso de axios
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=bnb&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error en la solicitud a la API externa:', error);
    res.status(500).json({ error: 'Error en la solicitud a la API externa' });
  }
});

// Middleware para habilitar CORS en el servidor proxy
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// Ruta para manejar la solicitud desde el frontend
app.get('/api/data', async (req, res) => {
  try {
    // Hacer la solicitud a la API externa
    const response = await fetch('https://api.coingecko.com' + req.url);
    const data = await response.json();

    // Devolver la respuesta de la API externa al frontend
    res.json(data);
  } catch (error) {
    console.error('Error en la solicitud a la API externa:', error);
    res.status(500).json({ error: 'Error en la solicitud a la API externa' });
  }
});

// Iniciar el servidor proxy en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor proxy en funcionamiento en http://localhost:${PORT}`);
});