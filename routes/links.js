const express = require("express");
const router = express.Router()
const Link = require("../models/Link")

// middleware to fetch a link by id, ensure it's for
//  the current user (at req.user)
function fetchLink(req,res,next){
  Link.findOne({_id: req.params.id, username: req.user.username})
  .then(function(link){
    if (link){
      req.link = link;
      next();
    } else {
      res.status(401).send("UNAUTHORIZED")
    }
  })
}


router.get("/links/new", function(req,res){
  res.render("links/new")
})

router.get("/links/:id/edit", fetchLink, function(req, res){
  res.render("links/edit", {
    user: req.user,
    link: req.link
  })
})

// without middleware:
// router.post("/links/:id/delete", function(req,res){
//   Link.deleteOne({_id: req.params.id, username: req.user.username})
//   .then(function(){
//     res.redirect("/")
//   })
//   .catch(function(){
//     res.status(422).send("NOPE")
//   })
// })

router.post("/links/:id/delete", fetchLink, function(req,res){
  req.link.remove()
  .then(function(){
    res.redirect("/")
  })
  .catch(function(){
    res.status(422).send("NOPE")
  })
})

router.post("/links/:id", fetchLink, function(req,res){
  const link = req.link;
  link.title = req.body.title
  link.body = req.body.body
  link.save()
  .then(function(link){
    res.redirect("/")
  })
  .catch(function(error){
    res.render("links/edit", {
      user: req.user,
      link: link,
      error: error
    })
  })
})

router.post("/links", function(req,res){
  const link = new Link()
  link.title = req.body.title
  link.body = req.body.body
  link.username = req.user.username
  link.save()
  .then(function(link){
    // YAY!
    res.redirect("/")
  })
  .catch(function(error){
    // BOOOOOO :(
    res.render("links/new", {
      error: error,
      link: link
    })
  })
})

module.exports = router;
