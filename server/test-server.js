const express = require('express');
const cors = require('cors');
const app = express();

// Basic middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

// Test route
app.post('/api/auth/register', (req, res) => {
  console.log('Registration request received:', req.body);
  res.json({
    success: true,
    message: 'Test registration successful'
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
});
