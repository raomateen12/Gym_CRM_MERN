const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'trainer', 'member'],
    default: 'member'
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    validate: {
      validator: function(v) {
        return /^[\d\s\-\+\(\)]{8,15}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  dateOfBirth: {
    type: Date
  },
  address: {
    type: String,
    trim: true
  },
  emergencyContact: {
    name: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^[\d\s\-\+\(\)]{8,15}$/.test(v);
        },
        message: 'Please provide a valid emergency contact phone number'
      }
    },
    relationship: {
      type: String
    }
  },
  fitnessGoals: [{
    type: String
  }],
  membershipType: {
    type: String,
    enum: ['basic', 'premium', 'elite'],
    default: 'basic'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  assignedTrainer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  // Trainer specific fields
  specializations: [{
    type: String
  }],
  experience: {
    type: Number
  },
  certifications: [{
    type: String
  }],
  // Member specific fields
  membershipPlan: {
    type: String,
    enum: ['basic', 'premium', 'elite'],
    default: 'basic'
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  healthInfo: {
    height: Number,
    weight: Number,
    fitnessGoals: [String],
    medicalConditions: [String],
    allergies: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
