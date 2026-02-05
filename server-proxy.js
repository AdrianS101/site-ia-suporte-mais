// Proxy simples para resolver CORS
// Execute com: node server-proxy.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Permitir CORS de qualquer origem
app.use(cors());
app.use(express.json());

// Endpoint proxy
app.post('/api/agents/:agentId/usar', async (req, res) => {
  try {
    const { agentId } = req.params;
    const apiUrl = `https://agente.novebr.com.br/agents/${agentId}/usar`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro no proxy:', error);
    res.status(500).json({ error: 'Erro ao processar requisição' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando em http://localhost:${PORT}`);
});
