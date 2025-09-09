const express = require('express');

const connectDB= require('./config/db');
const blogRoutes= require('./routes/blogroutes')
{/* i am not sure about he env varible*/}


const app= express();
app.use(express.json());
//  db connection
connectDB();

app.use('/api/blogs',blogRoutes);

app.use((err,req,res,next)=>{
    res.status(500).json({message:err.message});
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server runnign ${PORT}`))