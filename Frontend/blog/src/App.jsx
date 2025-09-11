import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Blog from './Pages/Blog';
import Author from './Pages/author';
import AuthLogin from './Pages/authLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* For author page only */}
       <Route path="/admin/login" element={<AuthLogin />} />
          <Route path="/admin/write" element={<Author />} />

        {/* For home page and scrollable sections */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Projects />
              <Blog />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
