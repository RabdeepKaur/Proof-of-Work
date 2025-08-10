const express = require("express");
const router = express.Router();
const Blog = require('../Models/blog');
const blogController=require("../Controllers/blogController")


// GET all published blogs
router.get("/",blogController.getAllBlogs);

//get blog by project id
router.geet("/project/:projectid",blogController.getBlogbyproject);

// get single blog by blog id
router.get("/:blogId",blogController.getSingleBlog);

module.exports=router;