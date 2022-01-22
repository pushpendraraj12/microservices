const mongoose = require('mongoose');
require('dotenv').config();
module.exports=()=>{
const uri=process.env.DB_URI;
mongoose.connect(uri, {dbName:process.env.DB_name, useNewUrlParser: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully for Content Service");
})
}