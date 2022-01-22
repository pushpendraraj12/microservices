const router=require('express').Router();
let Content=require('../models/content.model')

router.route('/:id').get((req, res) => {  
  Content.findOne({content_id:req.params.id})
    .then(story => res.json(story))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Content.findOneAndDelete({content_id:req.params.id})
    .then(() => res.json('Story deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/update/:id').post((req, res) => {
  Content.findOne({content_id:req.params.id})
    .then(story => {
      story.title = req.body.title;
      story.story = req.body.story;     
      story.save()
        .then(() => res.json('Content updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports=router