const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app=express();
app.use(express.json());
const port=process.env.PORT;
const hostname=process.env.HOSTNAME;
app.use(cors({
 origin: ["http://localhost:5000", "http://localhost:3000"],
 methods: ["GET","POST"],
 credentials: true
}));
require('./db')();
const interact_route=require('./routes/interact')
app.use("/api/interact", interact_route);

app.listen(port,hostname,()=>{
    console.log(`Server running on port: ${port}`);
})