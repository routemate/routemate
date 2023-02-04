const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  orders: { type: Array, default: [] },
  dateCreated: { type: Date, default: Date.now },
});

// userSchema.pre('save', function(next) {
//   const swf = parseInt(process.env.SALT_WORK_FACTOR);

//   bcrypt.hash(this.password, swf, (err, hash) => {
//     if (err) return next(err);

//     this.password = hash;

//     //allows mongoose to continue with saving the userSchema
//     return next();
//   });
// });

module.exports = mongoose.model('User', userSchema);
