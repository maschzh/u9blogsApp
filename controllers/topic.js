var Topic = require('../models/topic');
var validator = require('validator');

exports.create = function (req, res, next){
	var topic = new Topic();
	var title = validator.trim(req.body.title);
	var tab = req.body.tab;
	var content = validator.trim(req.body.content);
	topic.title = title;
	topic.tab = tab;
	topic.content = content;
	topic.author_id = req.body.author_id;
	topic.save(function (err, doc){
		if(err){
			return res.json({error: err});
		}
		return res.json(doc);
	});
};
//获取所有的帖子
exports.topicList = function (req, res, next){
	var pageNo = req.query.pageNo || 1;
	var pageSize = req.query.pageSize;
	var pageCount = 1;
	var query  = Topic.find().sort('-create_at').skip((pageNo-1)*pageSize).limit(pageSize);
	query.exec(function (err, topics){
		if(err){
			return next(err);
		} else {
			Topic.count(function (err, count){
				if(err){
					return next(err);
				} else {
					pageCount = Math.ceil(count / pageSize);
					return res.json({topics: topics, pageCount: pageCount});
				}
			});
		}
	});
};

//获取精华帖子
exports.topics_good = function (req, res, next){
	var pageNo = req.query.pageNo || 1;
	var pageSize = req.query.pageSize;
	var pageCount = 1;
	var query  = Topic.find({good: true}).sort('-create_at').skip((pageNo-1)*pageSize).limit(pageSize);
	query.exec(function (err, topics){
		if(err){
			return next(err);
		} else {
			Topic.count({good: true}, function (err, count){
				if(err){
					return next(err);
				} else {
					pageCount = Math.ceil(count / pageSize);
					return res.json({topics: topics, pageCount: pageCount});
				}
			});
		}
	});
};

//获取问答帖，分享，招聘
exports.topics_change = function (req, res, next){
	var pageNo = req.query.pageNo || 1;
	var pageSize = req.query.pageSize;
	var pageCount = 1;
	var query  = Topic.find({tab: req.params.tab}).sort('-create_at').skip((pageNo-1)*pageSize).limit(pageSize);
	query.exec(function (err, topics){
		if(err){
			return next(err);
		} else {
			Topic.count({tab: req.params.tab}, function (err, count){
				if(err){
					return next(err);
				} else {
					pageCount = Math.ceil(count / pageSize);
					return res.json({topics: topics, pageCount: pageCount});
				}
			});
		}
	});
};


exports.topics_unanswer = function(req, res, next){
	Topic.find({reply_count: 0}, function (err, topics){
		if(err){
			return next(err);
		}
	 	return res.json(topics);
	});
};

exports.topicOne = function (req, res, next){
	Topic.findById(req.params.topicId, function (err, topic){
		if(err){
		       return next(err);
		}
		topic.visit_count ++;
		topic.save(function (err, doc){
			if(err){
				return next(err);
			}
				//Status must set before return the topic
			res.status(200);
			return res.json(doc);
		});
	});
};

