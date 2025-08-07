const express= require("express")
const router= express.Router();
const Blog=require('../Models/Blog')

router.get("/", async(req,res)=>{
    try{
        const blog=await Blog.find({publish:true})
        .sort({createdAt:-1})
        .select('title content createAt _id projectId')

        res.json({
            success:true,
            blogs:blogs
        });
}catch(error){
    res.status(500).json({
        success:false,
        message:'Error fecthing blog',
        error:error.message
    });
}
});
// find blog according to the projects 
router.get("/project/:projectId",async(req,res)=>{
    try{
    const blog=await Blog.findById({
    projectId:req.params.projectId,
    published:true
}).populate('projectId','name description')
.sort({createAt:-1})
.select('title content createAt _id projectId')

if(!blogs || blog.length === 0){
    return res.status(404).json({
        success:false,
        message:"No blog foudn for this project"
    });
}
res.json({
    success:true,
    blogs:blogs,
    project:blogs[0].projectId
});
}catch(error){
    res.status(500).json({
        success:false,
        message:'error fecthing blogs for project',
        error:error.message
    })
}
})

// get  single blog by Id 

router.get('/:blogId',async(req,res)=>{
    try{
        const blog=await Blog.findOne({
            _id:req.params.blogId,
            projectId:true
        }).populate('projectId','name');

        if(!blog){
            return res.status(404).json({
                success:false,
                message:"Blog not found for this project"
            });
        }
        res.json({
            success:true,
            blog:blog
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error fecthing blog",
            error:error.message
        });
    }
});
module.exports=router;