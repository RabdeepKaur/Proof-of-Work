const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Adjust path to your Blog model

// Middleware to check access
const checkAdminAccess = (req, res, next) => {
  const { adminKey } = req.query;
  
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(404).json({
      success: false,
      message: 'Page not found'
    });
  }
  next();
};

// GET - Serve blog writing form/page
router.get('/write', checkAdminAccess, (req, res) => {
  res.render('write-blog'); // If using template engine
  // OR for API: res.json({ success: true, message: 'Admin access granted' });
});

// POST - Create new blog
router.post('/write', checkAdminAccess, async (req, res) => {
  try {
    const { title, content, projectId, published } = req.body; // Added projectId

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const newBlog = new Blog({
      title: title,
      content: content,
      projectId: projectId, // Add this if you want project association
      published: published === 'true' || published === true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: savedBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
});

// GET - Fetch all blogs (including unpublished) for admin management
router.get('/manage', checkAdminAccess, async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .select('title published createdAt _id');

    res.json({
      success: true,
      blogs: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
});

// PUT - Update existing blog
router.put('/edit/:id', checkAdminAccess, async (req, res) => {
  try {
    const { title, content, projectId, published } = req.body; // Added projectId
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
        projectId: projectId, // Add this if you want project association
        published: published === 'true' || published === true,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog: updatedBlog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
});

// DELETE - Delete blog
router.delete('/delete/:id', checkAdminAccess, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
});

// GET - View all blogs (FIXED)
router.get('/all', checkAdminAccess, async (req, res) => { // Added missing '/'
  try {
    const blogs = await Blog.find({})
      .populate('projectId', 'name')
      .sort({ createdAt: -1 }); // Fixed typo: createAt -> createdAt

    res.json({
      success: true, // Fixed typo: scccess -> success
      blogs: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching all blogs', // Fixed typo: fecthing -> fetching
      error: error.message
    });
  }
});

module.exports = router;