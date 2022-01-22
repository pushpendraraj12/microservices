const router=require('express').Router();
let User=require('../models/user.model')

router.route('/add').post(async (req, res) => {
  const {email,first_name,last_name,phone}=req.body;
  const user_id=email;
  const newUser = new User({
   user_id,
   email,
   first_name,
   last_name,
   phone
  });
    newUser.save()
    .then(() =>{res.json('usr added!')})
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {  
  User.findOne({user_id:req.params.id})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findOneAndDelete({user_id:req.params.id})
    .then(() => res.json('user deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/update/:id').post((req, res) => {
  User.findOne({user_id:req.params.id})
    .then(user => {
      user.first_name=req.body.first_name;
      user.last_name=req.body.last_name;
      user.phone=req.body.phone;   
      user.save()
        .then(() => res.json('details updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports=router