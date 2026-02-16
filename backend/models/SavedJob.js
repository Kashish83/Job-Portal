const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jobseeker', 'employer'], default: 'jobseeker' },
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }] // ✅ added
}, { timestamps: true });

// Password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await require('bcryptjs').genSalt(10);
  this.password = await require('bcryptjs').hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await require('bcryptjs').compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
