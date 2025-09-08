// client/src/config/socials.js
export const SOCIAL = {
  whatsapp: {
    phone: '524491958263', 
    message: "Hola Vitela’s👋, me gustaria hacer un pedido 😁"
  },
  facebook: 'https://www.facebook.com/share/14JHHjhaKUq/',   // ← reemplaza
  instagram: 'https://www.instagram.com/vitelas_gifts_and_clothes?igsh=ZDBtOHVhZjRrcDEy'  // ← reemplaza
};
export function waLink() {
  const { phone, message } = SOCIAL.whatsapp;
  const q = new URLSearchParams({ text: message }).toString();
  return `https://wa.me/${phone}?${q}`;
}