import './Contact.css';

export default function Contact() {
  return (
    <section className="contact-page">
      <h2>Contacto</h2>
      <p>
        Para pedidos o consultas, contáctanos al <strong>449 195 8263</strong> o
        completa el siguiente formulario:
      </p>
      <form>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />
        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}