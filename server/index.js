var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

var cors = require('cors');  //解除同源限制
app.use(cors());            //开放跨域共享

var Post = require('./models/post.js');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;      //删除命令行中的垃圾信息（过期信息）
mongoose.connect('mongodb://localhost:27017/digicity-express-api');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  console.log('success')

  // app.get('/', function(req, res) {
  //   var page = "<form method='post' action='/posts'>"+
  //              "<input type='text' name='title' />"+
  //              "<input type='submit' />"+
  //              "</form>"
  //   res.send(page)
  // })

  app.get('/posts',function(req, res) {
    Post.find().sort({'createdAt':-1}).exec(function(err, posts) {
      res.json({posts:posts})
    });
  })

  app.post('/posts', function(req, res) {
    var post = new Post({
      title:req.body.title,
      content:req.body.content,
      classify:req.body.classify
    });
    // res.redirect('http://www.baidu.com')
    // res.send("The Blog title is : " + req.body.title)
    post.save(function(err){
      if(err) return console.log(err);
      console.log('saved')
    })
    res.json({message:'保存'})
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
