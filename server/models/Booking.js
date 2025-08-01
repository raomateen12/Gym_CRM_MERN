const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Member is required']
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Trainer is required']
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  time: {
    type: String,
    required: [true, 'Booking time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time format (HH:MM)']
  },
  duration: {
    type: Number, // Duration in minutes
    default: 60,
    min: [30, 'Session duration must be at least 30 minutes'],
    max: [180, 'Session duration cannot exceed 3 hours']
  },
  sessionType: {
    type: String,
    enum: ['personal-training', 'group-class', 'consultation', 'assessment'],
    default: 'personal-training'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    trim: true
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  cancelledAt: {
    type: Date
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cancellationReason: {
    type: String,
    maxlength: [200, 'Cancellation reason cannot exceed 200 characters']
  },
  confirmedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookingSchema.index({ member: 1, date: 1 });
bookingSchema.index({ trainer: 1, date: 1 });
bookingSchema.index({ date: 1, time: 1 });
bookingSchema.index({ status: 1 });

// Compound index to prevent double booking
bookingSchema.index({ 
  trainer: 1, 
  date: 1, 
  time: 1, 
  status: 1 
}, { 
  unique: true,
  partialFilterExpression: { 
    status: { $in: ['pending', 'confirmed'] } 
  }
});

// Virtual for formatted date and time
bookingSchema.virtual('formattedDateTime').get(function() {
  const date = this.date.toLocaleDateString();
  return `${date} at ${this.time}`;
});

// Virtual to check if booking is in the past
bookingSchema.virtual('isPast').get(function() {
  const bookingDateTime = new Date(`${this.date.toDateString()} ${this.time}`);
  return bookingDateTime < new Date();
});

// Virtual to check if booking can be cancelled (at least 24 hours in advance)
bookingSchema.virtual('canBeCancelled').get(function() {
  if (this.status !== 'pending' && this.status !== 'confirmed') {
    return false;
  }
  
  const bookingDateTime = new Date(`${this.date.toDateString()} ${this.time}`);
  const twentyFourHoursFromNow = new Date();
  twentyFourHoursFromNow.setHours(twentyFourHoursFromNow.getHours() + 24);
  
  return bookingDateTime > twentyFourHoursFromNow;
});

// Populate member and trainer details when querying
bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'member',
    select: 'name email phone'
  }).populate({
    path: 'trainer',
    select: 'name email phone'
  });
  next();
});

// Middleware to update confirmedAt when status changes to confirmed
bookingSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'confirmed' && !this.confirmedAt) {
    this.confirmedAt = new Date();
  }
  
  if (this.isModified('status') && this.status === 'cancelled' && !this.cancelledAt) {
    this.cancelledAt = new Date();
  }
  
  next();
});

// Ensure JSON includes virtuals
bookingSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema);
