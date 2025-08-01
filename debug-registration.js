const axios = require('axios');

const testRegistration = async () => {
  try {
    console.log('Testing registration...');
    
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      dateOfBirth: '1990-01-01',
      address: '123 Test Street',
      emergencyContact: {
        name: 'Emergency Contact',
        phone: '0987654321',
        relationship: 'Friend'
      },
      fitnessGoals: ['Weight Loss'],
      membershipType: 'basic'
    };

    console.log('Sending registration data:', JSON.stringify(userData, null, 2));

    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    console.error('Error details:', error.response?.data?.details);
  }
};

testRegistration();
