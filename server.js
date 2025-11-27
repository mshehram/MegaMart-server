require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// ✅ CORS setup (frontend URL + localhost)
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:5173',
  ],
  credentials: true,
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// Health route for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server after DB connect
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    // ✅ FINAL FIX: Railway needs host "0.0.0.0"
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
