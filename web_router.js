var express = require('express');
var router = express.Router();
var user = require('./controllers/user');
/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {title:"U9BLOG"});
});
//登录/登出
router.post('/u9blog/user-signin', user.signin);
router.post('/u9blog/user-login', user.login);
module.exports = router;