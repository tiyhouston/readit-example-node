const express = require("express");
const router = express.Router();
const Link = require("../models/Link")

router.post("/links/:id/upvote", function(req,res){
  Link.findOne({_id: req.params.id})
  .then(function(link){
    link.totalLikes += 1
    link.save()
    .then(function(link){
      res.redirect("/")
    })
  })
})

router.post("/links/:id/downvote", function(req,res){
  Link.findOne({_id: req.params.id})
  .then(function(link){
    link.totalLikes -= 1
    link.save()
    .then(function(link){
      res.redirect("/")
    })
  })
})

module.exports = router;
