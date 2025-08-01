const mongoose = require('mongoose');

const progressEntrySchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Member is required']
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Date is required']
  },
  weight: {
    type: Number,
    min: [20, 'Weight must be at least 20kg'],
    max: [300, 'Weight cannot exceed 300kg']
  },
  bodyFat: {
    type: Number,
    min: [5, 'Body fat percentage must be at least 5%'],
    max: [50, 'Body fat percentage cannot exceed 50%']
  },
  muscleMass: {
    type: Number,
    min: [10, 'Muscle mass must be at least 10kg'],
    max: [150, 'Muscle mass cannot exceed 150kg']
  },
  reps: {
    type: Number,
    min: [0, 'Reps cannot be negative'],
    max: [10000, 'Reps cannot exceed 10000']
  },
  sets: {
    type: Number,
    min: [0, 'Sets cannot be negative'],
    max: [100, 'Sets cannot exceed 100']
  },
  workoutDuration: {
    type: Number, // Duration in minutes
    min: [5, 'Workout duration must be at least 5 minutes'],
    max: [300, 'Workout duration cannot exceed 5 hours']
  },
  caloriesBurned: {
    type: Number,
    min: [0, 'Calories burned cannot be negative'],
    max: [5000, 'Calories burned cannot exceed 5000']
  },
  bmi: {
    type: Number,
    min: [10, 'BMI must be at least 10'],
    max: [50, 'BMI cannot exceed 50']
  },
  height: {
    type: Number, // Height in cm
    min: [100, 'Height must be at least 100cm'],
    max: [250, 'Height cannot exceed 250cm']
  },
  waistCircumference: {
    type: Number, // in cm
    min: [50, 'Waist circumference must be at least 50cm'],
    max: [200, 'Waist circumference cannot exceed 200cm']
  },
  chestCircumference: {
    type: Number, // in cm
    min: [60, 'Chest circumference must be at least 60cm'],
    max: [200, 'Chest circumference cannot exceed 200cm']
  },
  armCircumference: {
    type: Number, // in cm
    min: [15, 'Arm circumference must be at least 15cm'],
    max: [60, 'Arm circumference cannot exceed 60cm']
  },
  legCircumference: {
    type: Number, // in cm
    min: [30, 'Leg circumference must be at least 30cm'],
    max: [100, 'Leg circumference cannot exceed 100cm']
  },
  fitnessGoal: {
    type: String,
    enum: ['weight-loss', 'weight-gain', 'muscle-building', 'endurance', 'strength', 'maintenance'],
    default: 'maintenance'
  },
  energyLevel: {
    type: Number,
    min: [1, 'Energy level must be between 1 and 10'],
    max: [10, 'Energy level must be between 1 and 10']
  },
  sleepQuality: {
    type: Number,
    min: [1, 'Sleep quality must be between 1 and 10'],
    max: [10, 'Sleep quality must be between 1 and 10']
  },
  stressLevel: {
    type: Number,
    min: [1, 'Stress level must be between 1 and 10'],
    max: [10, 'Stress level must be between 1 and 10']
  },
  waterIntake: {
    type: Number, // in liters
    min: [0, 'Water intake cannot be negative'],
    max: [20, 'Water intake cannot exceed 20 liters']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  photos: [{
    url: String,
    description: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPrivate: {
    type: Boolean,
    default: false // If true, only member can view, not even trainers/admins
  }
}, {
  timestamps: true
});

// Indexes for better query performance
progressEntrySchema.index({ member: 1, date: -1 });
progressEntrySchema.index({ member: 1, createdAt: -1 });
progressEntrySchema.index({ date: -1 });

// Compound index to prevent duplicate entries on the same date
progressEntrySchema.index({ 
  member: 1, 
  date: 1 
}, { 
  unique: true,
  partialFilterExpression: {
    date: { $exists: true }
  }
});

// Virtual for BMI calculation if height and weight are provided
progressEntrySchema.virtual('calculatedBMI').get(function() {
  if (this.weight && this.height) {
    const heightInMeters = this.height / 100;
    return Math.round((this.weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }
  return this.bmi;
});

// Virtual for weight change from previous entry
progressEntrySchema.virtual('weightChange').get(function() {
  // This would need to be populated when querying
  return this._weightChange;
});

// Pre-save middleware to calculate BMI if not provided
progressEntrySchema.pre('save', function(next) {
  if (this.weight && this.height && !this.bmi) {
    const heightInMeters = this.height / 100;
    this.bmi = Math.round((this.weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }
  next();
});

// Populate member details when querying
progressEntrySchema.pre(/^find/, function(next) {
  this.populate({
    path: 'member',
    select: 'name email'
  });
  next();
});

// Instance method to check if entry belongs to user
progressEntrySchema.methods.belongsToUser = function(userId) {
  return this.member._id.toString() === userId.toString();
};

// Static method to get progress summary for a member
progressEntrySchema.statics.getProgressSummary = async function(memberId, startDate, endDate) {
  const pipeline = [
    {
      $match: {
        member: memberId,
        date: {
          $gte: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Default: last 30 days
          $lte: endDate || new Date()
        }
      }
    },
    {
      $sort: { date: 1 }
    },
    {
      $group: {
        _id: null,
        totalEntries: { $sum: 1 },
        firstEntry: { $first: '$$ROOT' },
        lastEntry: { $last: '$$ROOT' },
        avgWeight: { $avg: '$weight' },
        avgBMI: { $avg: '$bmi' },
        avgEnergyLevel: { $avg: '$energyLevel' },
        avgSleepQuality: { $avg: '$sleepQuality' },
        avgStressLevel: { $avg: '$stressLevel' },
        totalWorkoutDuration: { $sum: '$workoutDuration' },
        totalCaloriesBurned: { $sum: '$caloriesBurned' },
        entries: { $push: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        totalEntries: 1,
        weightChange: {
          $cond: {
            if: { $and: ['$firstEntry.weight', '$lastEntry.weight'] },
            then: { $subtract: ['$lastEntry.weight', '$firstEntry.weight'] },
            else: 0
          }
        },
        bmiChange: {
          $cond: {
            if: { $and: ['$firstEntry.bmi', '$lastEntry.bmi'] },
            then: { $subtract: ['$lastEntry.bmi', '$firstEntry.bmi'] },
            else: 0
          }
        },
        avgWeight: { $round: ['$avgWeight', 1] },
        avgBMI: { $round: ['$avgBMI', 1] },
        avgEnergyLevel: { $round: ['$avgEnergyLevel', 1] },
        avgSleepQuality: { $round: ['$avgSleepQuality', 1] },
        avgStressLevel: { $round: ['$avgStressLevel', 1] },
        totalWorkoutDuration: 1,
        totalCaloriesBurned: 1,
        entries: 1
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result.length > 0 ? result[0] : null;
};

// Ensure JSON includes virtuals
progressEntrySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ProgressEntry', progressEntrySchema);
