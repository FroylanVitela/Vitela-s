const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const optionSetRoutes = require('./routes/optionSets');
const sizeGuideRoutes = require('./routes/sizeGuides');
const garmentPackageRoutes = require('./routes/garmentPackages');
const policyRoutes = require('./routes/policies');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mitienda';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/products', productRoutes);
app.use('/api/option-sets', optionSetRoutes);
app.use('/api/size-guides', sizeGuideRoutes);
app.use('/api/garment-packages', garmentPackageRoutes);
app.use('/api/policies', policyRoutes);

app.get('/', (req, res) => {
  res.send('API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});