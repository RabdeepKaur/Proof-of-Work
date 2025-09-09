const express = require("express");
const router = express.Router();
const blogController=require("../Controllers/blogController")


router.get("/", blogController.getAllBlogs);
router.get("/project/:projectid", blogController.getBlogbyproject);
router.get("/:blogId", blogController.getSingleBlog);
router.post('/',blogController.createBlog)

module.exports=router;