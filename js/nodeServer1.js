const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
 
//所有请求过来，都去项目当前的public目录下寻找所请求的文件，找到就返回
app.use(express.static('./images'));
 
//选择diskStorage存储
const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, path.resolve('./images/uploads'));
 },
 filename: function (req, file, cb) {
  cb(null, Date.now() + path.extname(file.originalname));//增加了文件的扩展名
 }
});
 
const upload = multer({storage: storage});
 
app.post('/upload.node', upload.single('avatar'), function(req, res, next) {
	 res.setHeader('Access-Control-Allow-Origin', '*');
	 res.send({
	  err: null
	  //filePath:就是图片在项目中的存放路径
	  //filePath: './images'
	 });
 
});
 
app.listen(3000, function () {
 console.log("app is listening 3000 port");
});