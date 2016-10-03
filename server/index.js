var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/digicity-express-api');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  var userSchema = mongoose.Schema({
    userName: String,password:String,age:String
  },
  {
    timestamps:true
  }
);

  var Info = mongoose.model('user',userSchema);
  //pppp 是实际数据库中记录的名字
  // var Kitty = new Info({
  //   userName: 'HelloKitty',password:'12456',age:'10'
  // });
  // console.log(Kitty.userName);
  // Kitty.save();
  //
  // Kitty.userName = 'peter'
  // Kitty.age = '2'
  // Kitty.save()
  //
  // Info.find().exec(function(err, users) {
  //   // 异步执行
  // console.log(users);

  Info.findById({_id: '57ecb26656565111b4388912'}, function(err, user) {
   user.name = '66666'
   user.save(function(err){
     console.log('更新了！')
     Info.find().exec(function(err, users) {
       // 异步执行
       console.log(users);
       });
    });
  });
console.log("我先出来了")
});
