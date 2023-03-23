const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    bookmark: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
