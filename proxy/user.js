var models = require('../models');
var User = models.User;


exports.getUsersByNames = function (names, callback){
	if(names.length === 0){
		return callback(null, []);
	}
	User.find({loginname: {$in: names }}, callback);
};

//get user by loginname
exports.getUserByLoginName = function (loginName, callback){
	User.findOne({'loginname': loginName}, callback);
};

//get user by id
exports.getUserById = function (id, callback){
	User.findOne({_id : id}, callback);
};

//get user by email
exports.getUserByMail = function (email, callback){
	User.findOne({email: eamil}, callback);
};