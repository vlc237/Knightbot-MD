const express = require('express');
const axios = require('axios');
const config = require('./config');

const app = express();
app.use(express.json());

/**
 * Webhook de vérification (GET) — utilisé lors de la config sur le dashboard Meta.
 */
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === config.verifyToken) {
    console.log('Webhook vérifiée !');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

/**
 * Webhook de réception de messages (POST)
 */
app.post('/webhook', async (req, res) => {
  const body = req.body;

  if (
    body.object &&
    body.entry &&
    body.entry[0].changes &&
    body.entry[0].changes[0].value.messages
  ) {
    const message = body.entry[0].changes[0].value.messages[0];
    const from = message.from;
    const text = message.text?.body;

    console.log(`Message reçu de ${from}: ${text}`);

    // Envoi d'une réponse automatique
    await axios.post(
      `${config.apiUrl}/${config.phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: from,
        text: {
          body: `Merci pour votre message : "${text}"`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${config.whatsappToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  res.sendStatus(200);
});

// Démarrage du serveur
app.listen(config.port, () => {
  console.log(`Bot WhatsApp actif sur http://localhost:${config.port}`);
});
