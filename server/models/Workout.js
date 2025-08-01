const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workout name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  trainer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignedMembers: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  exercises: [{
    name: {
      type: String,
      required: true
    },
    sets: {
      type: Number,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    weight: {
      type: Number
    },
    duration: {
      type: Number // in minutes
    },
    restTime: {
      type: Number // in seconds
    },
    instructions: {
      type: String
    }
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'hiit', 'other'],
    default: 'other'
  },
  estimatedDuration: {
    type: Number, // in minutes
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
workoutSchema.index({ trainer: 1 });
workoutSchema.index({ assignedMembers: 1 });
workoutSchema.index({ category: 1 });

module.exports = mongoose.model('Workout', workoutSchema);
