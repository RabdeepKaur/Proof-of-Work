const Blog= require("../Models/blog")
const Porjects=require("../utils/project");


//get all published blogs
exports.getAllblog=async(req ,res)=>{
    try{
        const blogs=await Blog.find({published:true})
        .sort({createdAt:-1})
        .select('title content by createat id for the porject ')

        const blogWithProjectInfo=blogs.map(blog=>({
            ...blog.toObject(),
            project:Porjects[blog.projectid]|| {name:'unkown porject'}
        }));
        res.json({success:true,blogs:blogWithProjectInfo});
    }catch(error){
        res.status(500).json({success:false,message:"error in getting the blog",error:error.message})
    }
};

//get blog by project id 
exports.getBlogByproject=async(res,res)=>{
    try{
        const {projectId} =req.params;
        const blog=await Blog.find({projectId,published:true})
        .sort({createdAt:-1})
        .select({'title conent whcih was creat eat and filter by projectid'})

        if(!blog.length){
            return res.status(404).json({success:false,message:"blog cannot be found",error:message.error})
        }
        const blogswithprojectinfo=blogs.map(blog=>({
            ...blog.toObject(),
            project:PROJECTS[projectId]
        }));
        res.json
    }
}