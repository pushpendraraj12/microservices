const router=require('express').Router();
let Interact=require('../models/interaction.model')

router.route('/likes/:id').post(async (req, res) => {  
   const interact= await Interact.findOne({content_id:req.params.id})
  if(interact==null){
    const newAdd= new Interact({
        content_id:req.params.id,
        reads:1,
        likes:1,
    })
    newAdd.save()
    .then(succ => {res.status(200).json("story Liked")})
    .catch(err=>res.status(400).json('Error: ' + err));
  }
  else{
     interact.likes+=1;
     interact.save()
     .then(succ=>res.status(200).json("story Liked"))
     .catch(err=>res.status(400).json('Error: ' + err))
  }   
});

router.route('/reads/:id').post(async (req, res) => {  
  const interact= await Interact.findOne({content_id:req.params.id})
  if(interact==null){
    const newAdd= new Interact({
        content_id:req.params.id,
        reads:1,
        likes:0,
    })
    newAdd.save()
    .then(succ => {res.status(200).json("story Read added")})
    .catch(err=>res.status(400).json('Error: ' + err));
  }
  else{
     interact.reads+=1;
     interact.save()
     .then(succ=>res.status(200).json("story read"))
     .catch(err=>res.status(400).json('Error: ' + err))
  }   
});

router.route('/sortbylike').get((req,res)=>{
Interact.find({}).sort({likes:-1})
.then(succ=>res.json(succ))
.catch(err=>res.json("err"+err))    
})

module.exports=router