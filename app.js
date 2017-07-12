const express = require("express");
const app = express();
const mustache = require("mustache-express");
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'));
app.set('layout', 'layout');

const homepageRoute = require("./routes/homepage")
app.use(homepageRoute);

app.listen(3000, function(){
  console.log("We are listening")
})
