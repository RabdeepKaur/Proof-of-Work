const express = require('express');
const {
  getPublishedBlogs,
  getBlogBySlug,
  searchBlogs,
  getAuthorBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  togglePublishStatus
} = require('../Controllers/blogController');
const { protect, authorize } = require('../middleware/authorMiddleware');

const router = express.Router();

// Public routes (for users to read blogs)
router.get('/', getPublishedBlogs);           // GET /api/blogs
router.get('/search', searchBlogs);           // GET /api/blogs/search?q=query
router.get('/:slug', getBlogBySlug);          // GET /api/blogs/:slug

// Protected author routes
router.use('/author', protect, authorize('author', 'admin')); // All routes below require authentication

router.route('/author')
  .get(getAuthorBlogs)    // GET /api/blogs/author - get all blogs for author
  .post(createBlog);      // POST /api/blogs/author - create new blog

router.route('/author/:id')
  .put(updateBlog)        // PUT /api/blogs/author/:id - update blog
  .delete(deleteBlog);    // DELETE /api/blogs/author/:id - delete blog

router.put('/author/:id/toggle-publish',togglePublishStatus);

module.exports=router;