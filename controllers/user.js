//var User = require('../proxy/user');
var User = require('../models/user');
var validator = require('validator');
var pwdMgr = require('../util/managePassword');

exports.signin = function (req, res, next){
	var user = new User();
	var name = validator.trim(req.body.name).toLowerCase();
	var email = validator.trim(req.body.email).toLowerCase();
	var pass = validator.trim(req.body.pass);
	var repass = validator.trim(req.body.re_pass);

	if(pass !== repass){
		return res.json({error:"两次输入的密码不一致，请重新输入！"});
	}

	pwdMgr.cryptPassword(pass, function (err, hash){
		user.name = name;
		user.loginname = name;
		user.pass = hash;
		user.email = email;
		user.create_at = Date.now();

		user.findByName(user.name, function (err, dbUser){
			if(err){
				res.json({error: err});
			}

			if(dbUser){
				return res.json({error: '用户名已经存在，请重新输入！'});
			}
			user.save(function (err, doc){
				if(err){
					res.json({error: err});
				}
				req.session.user = {
					'name': doc.name,
					'email': doc.email,
					'id': doc.id
				}
				req.session.loggedIn = true;
				return res.json({success: '恭喜你注册成功！'});
			});
		});
	});
};

exports.login = function (req, res, next){
	var user =req.body;
	var name = validator.trim(user.name).toLowerCase();
	var pass = validator.trim(user.pass).toLowerCase();

	User.findOne({loginname: name}, function (err, dbUser){
		pwdMgr.comparePassword(pass, dbUser.pass, function (err, isPasswordMatch){
			if(isPasswordMatch){
				dbUser.pass = '';
				return res.json(dbUser);
			} else {
				return res.json({error: '登录失败,密码不正确！'});
			}
		});
	});
};