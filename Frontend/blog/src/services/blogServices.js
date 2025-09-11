// services/blogService.js
import authService from '../services/authServices';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class BlogService {
  // Get all published blogs (public)
  async getPublishedBlogs(page = 1, limit = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs?page=${page}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch blogs: ' + error.message);
    }
  }

  // Get single blog by slug (public)
  async getBlogBySlug(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch blog: ' + error.message);
    }
  }

  // Search blogs (public)
  async searchBlogs(query, tags = '', page = 1, limit = 10) {
    try {
      const params = new URLSearchParams({
        q: query,
        tags,
        page: page.toString(),
        limit: limit.toString()
      });
      
      const response = await fetch(`${API_BASE_URL}/blogs/search?${params}`);
      return await response.json();
    } catch (error) {
      throw new Error('Failed to search blogs: ' + error.message);
    }
  }

  // Get all blogs for author (protected)
  async getAuthorBlogs(page = 1, limit = 10, status = '') {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status })
      });
      
      const response = await fetch(`${API_BASE_URL}/blogs/author?${params}`, {
        headers: authService.getAuthHeaders()
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch author blogs: ' + error.message);
    }
  }

  // Create new blog (protected)
  async createBlog(blogData) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/author`, {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(blogData)
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Failed to create blog: ' + error.message);
    }
  }

  // Update blog (protected)
  async updateBlog(id, blogData) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/author/${id}`, {
        method: 'PUT',
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(blogData)
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Failed to update blog: ' + error.message);
    }
  }

  // Delete blog (protected)
  async deleteBlog(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/author/${id}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders()
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Failed to delete blog: ' + error.message);
    }
  }

  // Toggle publish status (protected)
  async togglePublishStatus(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/author/${id}/toggle-publish`, {
        method: 'PUT',
        headers: authService.getAuthHeaders()
      });
      
      return await response.json();
    } catch (error) {
      throw new Error('Failed to toggle publish status: ' + error.message);
    }
  }
}

export default new BlogService();