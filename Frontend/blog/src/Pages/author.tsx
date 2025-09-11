// components/Author.js
// components/Author.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor/nohighlight';
import authService from '../services/authServices';
import blogService from '../services/blogServices';

function Author() {
  const [formData, setFormData] = useState({
    title: '',
    content: 'Write your blog....',
    excerpt: '',
    tags: '',
    isPublished: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear message when user starts typing
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value || ''
    }));
    
    if (message.text) setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a title' });
      return false;
    }
    
    if (!formData.content.trim() || formData.content === 'Write your blog....') {
      setMessage({ type: 'error', text: 'Please write some content' });
      return false;
    }
    
    return true;
  };

  const handleSave = async (publishStatus = false) => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const blogData = {
        title: formData.title.trim(),
        content: formData.content,
        excerpt: formData.excerpt.trim(),
        tags: formData.tags.trim(),
        isPublished: publishStatus
      };

      const response = await blogService.createBlog(blogData);

      if (response.success) {
        setMessage({ 
          type: 'success', 
          text: `Blog ${publishStatus ? 'published' : 'saved as draft'} successfully!` 
        });
        
        // Reset form
        setFormData({
          title: '',
          content: 'Write your blog....',
          excerpt: '',
          tags: '',
          isPublished: false
        });
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 2000);
        
      } else {
        setMessage({ type: 'error', text: response.message || 'Error saving blog' });
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Author Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Write New Blog</h2>
          
          {/* Message Display */}
          {message.text && (
            <div className={`mb-4 p-4 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <form className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter an engaging title for your blog"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Excerpt Input */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Optional)
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief summary of your blog (will be auto-generated if left empty)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Optional)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Enter tags separated by commas (e.g., technology, programming, web development)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <div className="border rounded-md">
                <MDEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  height={400}
                  preview="edit"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-md font-medium ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                } transition duration-200`}
              >
                {isLoading ? 'Saving...' : 'Save as Draft'}
              </button>
              
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 rounded-md font-medium ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition duration-200`}
              >
                {isLoading ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Author;