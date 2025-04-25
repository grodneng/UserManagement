// models/Visit.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Определяем схему посещения
const visitSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',    // если есть модель User
    required: false,
  },
});

// Компилируем и экспортируем модель
module.exports = mongoose.model('Visit', visitSchema);