const express = require('express');
const app= express();
app.get('/',(req,res)=>{
    res.send("server running!")
})
const blogRoutes=require("./routes/blog");
const blogwriteroutes=require("./routes/blogwrite");

const port=process.env.port ||3000;
app.use("./api/blog",blogroutes);
app.use("./admin/blog",blogwrite)
app.listen(port,()=>{
    console.log(`server is running ${port}`)
})