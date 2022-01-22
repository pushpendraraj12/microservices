const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app=express();
app.use(express.json());
const port=process.env.PORT || 8000;
const hostname=process.env.HOSTNAME;
app.use(cors({
 origin: ["http://localhost:5000", "http://localhost:3000"],
 methods: ["GET","POST"],
 credentials: true
}));
require('./db')();
const upload_route=require('./routes/content_upload')
app.use("/api/upload", upload_route);
const crud_route=require('./routes/crud_apis')
app.use("/api", crud_route);
const filter_route=require('./routes/filter')
app.use("/api", filter_route);
app.listen(port,hostname,()=>{
    console.log(`Server running on port: ${port}`);
})