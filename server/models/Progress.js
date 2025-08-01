const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  workout: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workout'
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  weight: {
    type: Number
  },
  bodyMeasurements: {
    chest: Number,
    waist: Number,
    arms: Number,
    thighs: Number
  },
  exerciseLog: [{
    exerciseName: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  energyLevel: {
    type: Number,
    min: 1,
    max: 10
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
progressSchema.index({ member: 1, date: -1 });
progressSchema.index({ workout: 1 });

module.exports = mongoose.model('Progress', progressSchema);
