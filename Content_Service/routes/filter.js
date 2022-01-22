const axios=require('axios')
const router=require('express').Router();
let Content=require('../models/content.model')
router.route('/sort').post((req,res)=>{
    var dlink=req.protocol+'://user_interaction:5001'+'/api/interact/sortbylike';
    axios.get(dlink)
    .then((arr)=>{
        const ar=arr.data;
        var ans=[];
        ar.forEach(element => {
        var id=element.content_id;
        Content.findOne({content_id:id})
        .then(cont=>ans.push(cont))
        .catch(err=>res.status(500).json("err"+err))       
    });
       setTimeout(function(){res.status(200).json(ans);}, 500);
    })
    .catch(err=>{res.json(err)})   
})
router.route('/sbydate').post((req, res) => {  
  Content.find({}).sort({date_published:1})
    .then((story) => res.status(200).json(story))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports=router