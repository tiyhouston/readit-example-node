const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

router.get("/", function(req,res){
  Link.find().sort("-totalLikes").sort("createdAt")
  .then(function(links){

    // iterate over the links
    // set if each link was createdByCurrentUser
    for (var i = 0; i < links.length; i++) {
      if (links[i].username === req.user.username){
        // OMG YAY IT WORKS
        links[i].createdByCurrentUser = true;
      }

      links[i].excerpt = links[i].body.slice(0,140)
      if (links[i].body.length > 140){
        links[i].excerpt += '...'
      }
    }

    res.render("index", {
      user: req.user,
      links: links
    });
  })
})

module.exports = router;
