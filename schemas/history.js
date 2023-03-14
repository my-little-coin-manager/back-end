const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    transaction: { type: String, required: true },
    market: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { versionKey: false }
);

const historySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    history: {
      market: String,
      transaction: String,
      date: { type: Date, default: Date.now },
      price: Number,
      qty: Number,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('History', historySchema);
