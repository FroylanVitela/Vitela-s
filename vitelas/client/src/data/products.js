// Catálogo estático de Vitela's (frontend-only)
export const CATEGORIES = {
  mugs:       { key: 'mugs',       name: 'Tazas cerámica' },
  bottles:    { key: 'bottles',    name: 'Botellas aluminio' },
  steel:      { key: 'steel',      name: 'Recipientes acero' },
  glass:      { key: 'glass',      name: 'Vidrio' },
  keytags:    { key: 'keytags',    name: 'Llaveros, placas y destapadores' },
  tees:       { key: 'tees',       name: 'Playeras algodón/deportiva' },
  kids:       { key: 'kids',       name: 'Playeras niño' },
  hoodies:    { key: 'hoodies',    name: 'Sudaderas con capucha' },
  crewnecks:  { key: 'crewnecks',  name: 'Sudaderas lisas' },
};

export const MATERIALS = [
  { key: 'ceramica', name: 'Cerámica' },
  { key: 'aluminio', name: 'Aluminio' },
  { key: 'acero',    name: 'Acero' },
  { key: 'vidrio',   name: 'Vidrio' },
  { key: 'textil',   name: 'Textil' },
];

// Helper de precios por rangos (1–11, 12–36, 37+)
const PT = (p1, p2, p3) => ([
  { label: '1–11', precio: p1 },
  { label: '12–36', precio: p2 },
  { label: '37 o más', precio: p3 },
]);

// === TAZAS (cerámica) ===
// Precios según PDF para cada modelo. :contentReference[oaicite:1]{index=1}
const mugs = [
  { slug:'taza-blanca-11oz',      title:'Taza blanca 11 oz',      material:'ceramica', category:'mugs', priceTiers: PT(120,105,95) },
  { slug:'taza-negra-11oz',       title:'Taza negra 11 oz',       material:'ceramica', category:'mugs', priceTiers: PT(130,115,105) },
  { slug:'taza-asa-corazon',      title:'Taza asa corazón',   material:'ceramica', category:'mugs', priceTiers: PT(140,125,115) },
  { slug:'taza-perlada',          title:'Taza perlada',             material:'ceramica', category:'mugs', priceTiers: PT(140,125,115) },
  { slug:'taza-espejo',           title:'Taza espejo',      material:'ceramica', category:'mugs', priceTiers: PT(140,125,115) },
  { slug:'taza-interior-color',   title:'Taza interior color', material:'ceramica', category:'mugs', priceTiers: PT(120,105,95) },
  { slug:'taza-color-cuchara',    title:'Taza color + cuchara', material:'ceramica', category:'mugs', priceTiers: PT(130,115,105) },
  { slug:'taza-conica-12',        title:'Taza cónica 12 oz',      material:'ceramica', category:'mugs', priceTiers: PT(110,95,85) },
  { slug:'taza-conica-17',        title:'Taza cónica 17 oz',      material:'ceramica', category:'mugs', priceTiers: PT(120,105,95) },
  { slug:'taza-magica-11',        title:'Taza mágica 11 oz',      material:'ceramica', category:'mugs', priceTiers: PT(150,135,120) },
  { slug:'taza-magica-conica-12', title:'Taza mágica cónica 12 oz', material:'ceramica', category:'mugs', priceTiers: PT(140,125,115) },
  { slug:'taza-magica-conica-17', title:'Taza mágica cónica 17 oz', material:'ceramica', category:'mugs', priceTiers: PT(170,155,140) },
];

// === BOTELLAS DE ALUMINIO === :contentReference[oaicite:2]{index=2}
const bottles = [
  { slug:'aluminio-taparrosca', title:'Botella con taparrosca', material:'aluminio', category:'bottles', priceTiers: PT(200,175,165) },
  { slug:'aluminio-lata',       title:'Lata tipo refresco',     material:'aluminio', category:'bottles', priceTiers: PT(135,120,105) },
  { slug:'aluminio-boton',      title:'Botón presionable',      material:'aluminio', category:'bottles', priceTiers: PT(140,125,115) },
  { slug:'aluminio-deportiva',  title:'Botella deportiva',      material:'aluminio', category:'bottles', priceTiers: PT(200,175,165) },
  { slug:'aluminio-infantil',   title:'Botella infantil',       material:'aluminio', category:'bottles', priceTiers: PT(200,175,165) },
];

// === RECIPIENTES DE ACERO === (vasos, latas, tarros, tumbler, YETI…) :contentReference[oaicite:3]{index=3}
const steel = [
  { slug:'jarra-viajera',      title:'Jarra viajera',          material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'vaso-recto',         title:'Vaso recto',             material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'lata-450',           title:'Lata 450 ml',            material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'lata-300',           title:'Lata 300 ml',            material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'vaso-conico',        title:'Vaso cónico',            material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'yeti-20',            title:'Vaso YETI (20 oz)',      material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'skinny-acero',       title:'Vaso Skinny de acero',   material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'vinero',             title:'Vaso vinero',            material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'vaso-acero-tapa',    title:'Vaso de acero con tapa', material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'tarro-acero',        title:'Tarro de acero',         material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'tumbler-conico',     title:'Tumbler cónico con popote',material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'taza-acero',         title:'Taza de acero',          material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'botella-acero-cuello-plastico', title:'Botella de acero c/ cuello plástico', material:'acero', category:'steel', priceTiers: PT(200,175,165) },
  { slug:'yeti-30',            title:'Vaso YETI (30 oz)',      material:'acero', category:'steel', priceTiers: PT(200,175,165) },
];

// === VIDRIO (tequileros, skinny, tarro, tazas) === :contentReference[oaicite:4]{index=4}
const glass = [
  { slug:'tequilero-vidrio',         title:'Tequileros de vidrio (par)',   material:'vidrio', category:'glass', priceTiers: PT(135,115,105) },
  { slug:'tequilero-ceramica',       title:'Tequileros de cerámica (par)', material:'vidrio', category:'glass', priceTiers: PT(150,130,115) },
  { slug:'taza-vidrio',              title:'Taza de vidrio',                material:'vidrio', category:'glass', priceTiers: PT(200,175,165) },
  { slug:'taza-satinada-fondo',      title:'Taza satinada c/ fondo de color', material:'vidrio', category:'glass', priceTiers: PT(150,130,115) },
  { slug:'skinny-vidrio-bambu',      title:'Skinny de vidrio c/ tapa de bambú', material:'vidrio', category:'glass', priceTiers: PT(200,175,165) },
  { slug:'tarro-vidrio',             title:'Tarro de vidrio',               material:'vidrio', category:'glass', priceTiers: PT(200,175,165) },
];

// === LLAVEROS / PLACAS / DESTAPADORES === (cualquier forma) :contentReference[oaicite:5]{index=5}
const keytags = [
  { slug:'llaveros-placas-destapadores', title:'Llaveros, placas y destapadores (cualquier forma)', material:'acero', category:'keytags', priceTiers: PT(80,60,50) },
];

// === TEXTIL: Playeras (algodón/deportiva/sublimada) ===
// Definimos “servicios” por tipo de impresión y combinación. :contentReference[oaicite:6]{index=6}
const tees = [
  { slug:'tee-algodon-1-grande',   title:'Playera algodón/deportiva • 1 estampado grande',  material:'textil', category:'tees', priceTiers: PT(290,265,220) },
  { slug:'tee-algodon-1-chico',    title:'Playera algodón/deportiva • 1 estampado chico',   material:'textil', category:'tees', priceTiers: PT(220,195,180) },
  { slug:'tee-algodon-1c1g',       title:'Playera algodón/deportiva • 1 chico + 1 grande',  material:'textil', category:'tees', priceTiers: PT(320,280,250) },
  { slug:'tee-algodon-2g',         title:'Playera algodón/deportiva • 2 estampados grandes', material:'textil', category:'tees', priceTiers: PT(390,365,320) },

  { slug:'tee-sublimada-1-grande', title:'Playera sublimada • 1 diseño grande', material:'textil', category:'tees', priceTiers: PT(220,180,160) },
  { slug:'tee-sublimada-1-chico',  title:'Playera sublimada • 1 diseño chico',  material:'textil', category:'tees', priceTiers: PT(160,135,125) },
  { slug:'tee-sublimada-1c1g',     title:'Playera sublimada • 1 chico + 1 grande', material:'textil', category:'tees', priceTiers: PT(250,220,180) },
  { slug:'tee-sublimada-2g',       title:'Playera sublimada • 2 diseños grandes', material:'textil', category:'tees', priceTiers: PT(290,265,220) },
];

// === NIÑO === :contentReference[oaicite:7]{index=7}
const kids = [
  { slug:'nino-1-grande',  title:'Playera niño • 1 diseño grande', material:'textil', category:'kids', priceTiers: PT(180,145,125) },
  { slug:'nino-1-chico',   title:'Playera niño • 1 diseño chico',  material:'textil', category:'kids', priceTiers: PT(140,115,95) },
  { slug:'nino-1c1g',      title:'Playera niño • 1 chico + 1 grande', material:'textil', category:'kids', priceTiers: PT(200,165,135) },
  { slug:'nino-2g',        title:'Playera niño • 2 diseños grandes',  material:'textil', category:'kids', priceTiers: PT(230,205,180) },
];

// === SUDADERAS CON CAPUCHA Y CANGURERA (unisex) === :contentReference[oaicite:8]{index=8}
const hoodies = [
  { slug:'hoodie-1-chico',  title:'Sudadera con capucha • 1 diseño chico',  material:'textil', category:'hoodies', priceTiers: PT(410,390,350) },
  { slug:'hoodie-1-grande', title:'Sudadera con capucha • 1 diseño grande', material:'textil', category:'hoodies', priceTiers: PT(450,420,390) },
  { slug:'hoodie-1c1g',     title:'Sudadera con capucha • 1 chico + 1 grande', material:'textil', category:'hoodies', priceTiers: PT(480,460,410) },
  { slug:'hoodie-2g',       title:'Sudadera con capucha • 2 diseños grandes',   material:'textil', category:'hoodies', priceTiers: PT(550,520,490) },
];

// === SUDADERAS LISAS (unisex) === :contentReference[oaicite:9]{index=9}
const crewnecks = [
  { slug:'crew-1-chico',  title:'Sudadera lisa • 1 diseño chico',  material:'textil', category:'crewnecks', priceTiers: PT(330,310,270) },
  { slug:'crew-1-grande', title:'Sudadera lisa • 1 diseño grande', material:'textil', category:'crewnecks', priceTiers: PT(390,360,330) },
  { slug:'crew-1c1g',     title:'Sudadera lisa • 1 chico + 1 grande', material:'textil', category:'crewnecks', priceTiers: PT(420,395,380) },
  { slug:'crew-2g',       title:'Sudadera lisa • 2 diseños grandes',   material:'textil', category:'crewnecks', priceTiers: PT(490,460,430) },
];

export const PRODUCTS = [
  ...mugs, ...bottles, ...steel, ...glass, ...keytags, ...tees, ...kids, ...hoodies, ...crewnecks
];
