const express = require('express');
const cors = require('cors');

const app = express();

// ✅ CORS setup (frontend + localhost)
app.use(cors({
  origin: [
    'http://localhost:5173',                 // Local frontend
    'https://mega-mart-mshehram.vercel.app' // Vercel frontend
  ],
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Root route
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// ✅ Health check route for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ✅ Dummy API route (optional)
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// ✅ Use Railway PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
