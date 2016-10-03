var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

var Post = require('./models/post.js');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/digicity-express-api');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('success')
  app.get('/', function(req, res) {

    var page = "<form method='post' action='/posts'>"+
               "<input type='text' name='title' />"+
               "<input type='submit' />"+
               "</form>"
    res.send(page)
  })

  app.post('/posts', function(req, res) {
    var post = new Post({title:req.body.title});
    res.redirect('/posts')
    // res.redirect('http://www.baidu.com')
    // res.send("The Blog title is : " + req.body.title)
    post.save(function(){
      console.log('yibuzhixing')
    })
  })

  app.get('/posts',function(req, res) {
    Post.find().sort({'createdAt': -1}).exec(function(err, posts) {
      res.send(posts)
    });
  })

  app.listen(3000, function() {
    console.log('running on post 3000')
  })

})



// app.get('/posts:id', function(req, res) {
//
//   res.send('get /posts')
//   console.log('get/posts/:id')
// })

// app.put('/posts/:id', function(req, res) {
//   console.log('put')
// })



// app.delete('/posts/:id', function(req, res) {
//   console.log('delete')
// })
