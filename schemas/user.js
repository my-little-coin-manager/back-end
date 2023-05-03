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
      required: true,
    },
    bookmark: {
      type: Array,
    },
    refreshToken: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
