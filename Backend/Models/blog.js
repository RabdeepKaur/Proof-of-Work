const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxLength: [500, 'Excerpt cannot exceed 500 characters']
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  readTime: {
    type: Number, // in minutes
    default: 1
  },
  views: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate slug before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Date.now();
  }
  
  // Generate excerpt if not provided
  if (!this.excerpt && this.content) {
    const plainText = this.content.replace(/[#*`_\[\]()]/g, '');
    this.excerpt = plainText.substring(0, 150) + '...';
  }
  
  // Calculate read time (average 200 words per minute)
  if (this.content) {
    const wordCount = this.content.split(' ').length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  
  // Set published date when publishing
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Static method to get published blogs
blogSchema.statics.getPublished = function() {
  return this.find({ isPublished: true }).sort({ publishedAt: -1 });
};

// Instance method to toggle publish status
blogSchema.methods.togglePublish = function() {
  this.isPublished = !this.isPublished;
  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  return this.save();
};

module.exports = mongoose.model('Blog', blogSchema);