console.log('Starting server...');

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Registration endpoint
app.post('/api/auth/register', (req, res) => {
  console.log('=== REGISTRATION REQUEST RECEIVED ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  // Simple success response
  res.json({
    success: true,
    message: 'Registration successful!',
    user: {
      id: '123',
      name: req.body.name,
      email: req.body.email,
      role: 'member'
    }
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  console.log('=== LOGIN REQUEST RECEIVED ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  // Simple success response
  res.json({
    success: true,
    message: 'Login successful!',
    user: {
      id: '123',
      name: 'Test User',
      email: req.body.email,
      role: 'member'
    }
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Test registration: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`Test login: POST http://localhost:${PORT}/api/auth/login`);
});
