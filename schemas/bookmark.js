const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  bookmark: { type: Array },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
