require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,

  // Token de vérification utilisé pour valider la webhook avec Meta
  verifyToken: process.env.VERIFY_TOKEN || 'default_verify_token',

  // Token d'accès à l'API WhatsApp Cloud
  whatsappToken: process.env.WHATSAPP_TOKEN,

  // ID du numéro WhatsApp (fournit dans le dashboard Meta)
  phoneNumberId: process.env.PHONE_NUMBER_ID,

  // URL de base de l'API WhatsApp Cloud
  apiUrl: process.env.API_URL || 'https://graph.facebook.com/v18.0',
};
