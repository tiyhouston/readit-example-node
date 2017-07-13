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
    }

    res.render("index", {
      user: req.user,
      links: links
    });
  })
})

module.exports = router;
