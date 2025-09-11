const Blog = require('../Models/blog');
const asyncHandler = require('express-async-handler');

// @desc    Get all published blogs (Public)
// @route   GET /api/blogs
// @access  Public
const getPublishedBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const blogs = await Blog.find({ isPublished: true })
    .select('title excerpt slug tags publishedAt readTime views')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Blog.countDocuments({ isPublished: true });
  
  res.json({
    success: true,
    data: blogs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single blog by slug (Public)
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ 
    slug: req.params.slug, 
    isPublished: true 
  });
  
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog not found'
    });
  }
  
  // Increment view count
  blog.views += 1;
  await blog.save();
  
  res.json({
    success: true,
    data: blog
  });
});

// @desc    Search blogs (Public)
// @route   GET /api/blogs/search
// @access  Public
const searchBlogs = asyncHandler(async (req, res) => {
  const { q, tags } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  let searchQuery = { isPublished: true };
  
  if (q) {
    searchQuery.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
      { excerpt: { $regex: q, $options: 'i' } }
    ];
  }
  
  if (tags) {
    const tagArray = tags.split(',').map(tag => tag.trim());
    searchQuery.tags = { $in: tagArray };
  }
  
  const blogs = await Blog.find(searchQuery)
    .select('title excerpt slug tags publishedAt readTime views')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Blog.countDocuments(searchQuery);
  
  res.json({
    success: true,
    data: blogs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get all blogs for author (Published + Drafts)
// @route   GET /api/author/blogs
// @access  Private (Author only)
const getAuthorBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const status = req.query.status; // 'published', 'draft', or undefined for all
  
  let filter = {};
  if (status === 'published') {
    filter.isPublished = true;
  } else if (status === 'draft') {
    filter.isPublished = false;
  }
  
  const blogs = await Blog.find(filter)
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Blog.countDocuments(filter);
  
  res.json({
    success: true,
    data: blogs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

// @desc    Create new blog
// @route   POST /api/author/blogs
// @access  Private (Author only)
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, tags, isPublished } = req.body;
  
  const blog = await Blog.create({
    title,
    content,
    excerpt,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    isPublished: isPublished || false
  });
  
  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    data: blog
  });
});

// @desc    Update blog
// @route   PUT /api/author/blogs/:id
// @access  Private (Author only)
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog not found'
    });
  }
  
  const { title, content, excerpt, tags, isPublished } = req.body;
  
  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.excerpt = excerpt || blog.excerpt;
  blog.tags = tags ? tags.split(',').map(tag => tag.trim()) : blog.tags;
  
  // Handle publish status change
  if (isPublished !== undefined) {
    blog.isPublished = isPublished;
  }
  
  const updatedBlog = await blog.save();
  
  res.json({
    success: true,
    message: 'Blog updated successfully',
    data: updatedBlog
  });
});

// @desc    Delete blog
// @route   DELETE /api/author/blogs/:id
// @access  Private (Author only)
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog not found'
    });
  }
  
  await blog.deleteOne();
  
  res.json({
    success: true,
    message: 'Blog deleted successfully'
  });
});

// @desc    Toggle blog publish status
// @route   PUT /api/author/blogs/:id/toggle-publish
// @access  Private (Author only)
const togglePublishStatus = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: 'Blog not found'
    });
  }
  
  await blog.togglePublish();
  
  res.json({
    success: true,
    message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully`,
    data: blog
  });
});

module.exports = {
  getPublishedBlogs,
  getBlogBySlug,
  searchBlogs,
  getAuthorBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  togglePublishStatus
};
