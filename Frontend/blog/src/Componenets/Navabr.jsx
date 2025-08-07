function Navbar() {
  return (
    <nav className="bg-black px-6 py-10">
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo / Brand */}
        <div className="text-white text-2xl font-bold mb-3 lg:mb-0">
          <a href="/" className="hover:text-green-400 transition-colors">
            Proof of Work
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col lg:flex-row items-center gap-4 cursor-pointer">
          <a href="/" className="text-white hover:text-green-400 transition-colors">
            Project
          </a>
          <a href="/Blog" className="text-white hover:text-green-400 transition-colors">
            Blogs
          </a>
          <a href="/contact" className="text-white hover:text-green-400 transition-colors">
            Contact
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
