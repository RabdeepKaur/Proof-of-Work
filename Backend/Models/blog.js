const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/magesDB");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  projectId: { type: String, required: true }, // the project are hard coded here 
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);