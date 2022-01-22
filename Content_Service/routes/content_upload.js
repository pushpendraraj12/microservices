const router=require('express').Router();
const multer=require('multer')
const {v4:uuidv4} = require('uuid')
const csvtojson = require('csvtojson');
const DIR='${__dirname}/../uploads/';
let Content=require('../models/content.model')
const storage=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');      
        cb(null, uuidv4() + '-' + fileName)
    }
})

let upload = multer({
    storage: storage,
    limit:{fileSize:1000000*50},
}).single('file');
router.route('/c_upload').post(async (req,res)=>{
    upload(req,res,async (error)=>{
    if(error){
    res.status(500).json(error.message)
}
const fileName = './uploads/'+req.file.filename;
csvtojson().fromFile(fileName).then(async source => {
  console.log(source)
         const csvData = new Content({
             content_id:uuidv4(),
             user_id:source[0].email_id,
             title:source[0].title,         
             story:source[0].story,             
         });   
        //  console.log(source[0].title)
         csvData.save()
         .then(succ=> res.json("Upload successfully"))
         .catch(err=>{
        return res.status(400).json("Some fields are missing in csv or contain duplicate data")
         })               
    //  console.log(arrayToInsert)

})
       
    })
})
module.exports=router