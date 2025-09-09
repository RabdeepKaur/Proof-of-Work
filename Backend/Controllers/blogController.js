// Controllers/blogController.js
const Blog = require('../Models/blog');

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogbyproject = async (req, res) => {
    try {
        const blogs = await Blog.find({ projectId: req.params.projectid });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBlog=async(req,res)=>{
    try{
        const newBlog=new Blog(req.body);
        const savedBlog=await newBlog.save();
        res.status(201).json(savedBlog);
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

module.exports = { getAllBlogs, getBlogbyproject, getSingleBlog,createBlog };
