var express = require('express');
var router = express.Router();
var user = require('./controllers/user');
var topic = require('./controllers/topic');
/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {title:"U9BLOG"});
});
//登录/登出
router.post('/u9blog/user-signin', user.signin);
router.post('/u9blog/user-login', user.login);

//topic
router.post('/u9blog/create_topic', topic.create);
router.get('/u9blog/topics', topic.topicList);
router.get('/u9blog/topics_good', topic.topics_good);
router.get('/u9blog/topics_change/:tab', topic.topics_change);
router.get('/u9blog/topics_unanswer', topic.topics_unanswer);
router.get('/u9blog/topic/:topicId', topic.topicOne);
module.exports = router;