const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


class AuthService {
  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Set token in localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  }

  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get user from localStorage
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Set user in localStorage
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Get auth headers
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Login
  async login(identifier, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (data.success) {
        this.setToken(data.data.token);
        this.setUser({
          _id: data.data._id,
          username: data.data.username,
          email: data.data.email,
          role: data.data.role
        });
      }

      return data;
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    }
  }

  // Register
  async register(username, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (data.success) {
        this.setToken(data.data.token);
        this.setUser({
          _id: data.data._id,
          username: data.data.username,
          email: data.data.email,
          role: data.data.role
        });
      }

      return data;
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  // Logout
  async logout() {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.removeToken();
    }
  }

  // Get profile
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: this.getAuthHeaders()
      });

      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch profile: ' + error.message);
    }
  }
}

export default new AuthService();