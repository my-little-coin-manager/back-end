const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  bookmark: { type: Object },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
