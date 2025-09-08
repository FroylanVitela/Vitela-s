const mongoose = require('mongoose');

const SizeGuideSchema = new mongoose.Schema(
  {
    // Identificador legible y único
    slug: { type: String, required: true, unique: true, index: true },

    // Título para mostrar en UI (ej. "Playeras • Caballero")
    title: { type: String, required: true },

    // Tipo de prenda: "playera", "sudadera"
    garment: { type: String, required: true, enum: ['playera', 'sudadera'] },

    // Público / ajuste: "caballero", "dama", "niño", "unisex"
    audience: { type: String, required: true, enum: ['caballero', 'dama', 'niño', 'unisex'] },

    // Opcional (ej. "con capucha y cangurera", "lisa")
    variant: { type: String, default: '' },

    // Columnas de la tabla (ej. ["Talla","Pecho (cm)","Pecho (in)","Largo (cm)","Largo (in)"])
    columns: { type: [String], required: true },

    // Filas de la tabla como matriz de celdas (array de arrays)
    rows: {
      type: [[mongoose.Schema.Types.Mixed]],
      required: true,
      validate: v => Array.isArray(v) && v.length > 0,
    },

    // Imagen opcional para mostrar arriba de la tabla
    imageUrl: { type: String, default: '' },

    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SizeGuide', SizeGuideSchema);