const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a workout title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify the member for this workout plan']
  },
  exercises: [
    {
      name: {
        type: String,
        required: [true, 'Exercise name is required'],
        trim: true,
        maxlength: [100, 'Exercise name cannot be more than 100 characters']
      },
      sets: {
        type: Number,
        required: [true, 'Number of sets is required'],
        min: [1, 'Sets must be at least 1'],
        max: [20, 'Sets cannot be more than 20']
      },
      reps: {
        type: Number,
        required: [true, 'Number of reps is required'],
        min: [1, 'Reps must be at least 1'],
        max: [100, 'Reps cannot be more than 100']
      },
      weight: {
        type: Number,
        min: [0, 'Weight cannot be negative'],
        max: [1000, 'Weight cannot be more than 1000kg']
      },
      rest: {
        type: String,
        required: [true, 'Rest time is required'],
        trim: true,
        maxlength: [20, 'Rest time cannot be more than 20 characters']
      },
      notes: {
        type: String,
        trim: true,
        maxlength: [200, 'Notes cannot be more than 200 characters']
      }
    }
  ],
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Assigned by field is required']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: Number, // Duration in minutes
    min: [10, 'Workout duration must be at least 10 minutes'],
    max: [300, 'Workout duration cannot be more than 5 hours']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
workoutPlanSchema.index({ member: 1, isActive: 1 });
workoutPlanSchema.index({ assignedBy: 1 });

// Virtual for exercise count
workoutPlanSchema.virtual('exerciseCount').get(function() {
  return this.exercises.length;
});

// Populate member and assignedBy details when querying
workoutPlanSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'member',
    select: 'name email role'
  }).populate({
    path: 'assignedBy',
    select: 'name email role'
  });
  next();
});

// Ensure JSON includes virtuals
workoutPlanSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
