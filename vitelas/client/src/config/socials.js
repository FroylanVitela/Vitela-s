// client/src/config/socials.js
// Reemplaza con tus datos reales
export const SOCIAL = {
  whatsapp: {
    // número en formato internacional (México = 52 + 10 dígitos)
    phone: '524491958263', // ← 449 195 8263
    message: "Hola Vitela’s, quiero personalizar un pedido 👋"
  },
  facebook: 'https://facebook.com/vitelas',   // ← reemplaza
  instagram: 'https://instagram.com/vitelas'  // ← reemplaza
};

// Crea el link directo a WhatsApp con el mensaje prellenado
export function waLink() {
  const { phone, message } = SOCIAL.whatsapp;
  const q = new URLSearchParams({ text: message }).toString();
  return `https://wa.me/${phone}?${q}`;
}