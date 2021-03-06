var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name : { type: String},
	loginname: {type: String},
	pass: {type: String},
	email:{type: String},
	url:{type: String},
	profile_image_url:{type: String},
	location:{type: String},
	signature:{type: String},
	weibo:{type: String},
	avatar:{type: String},
	is_block:{type: Boolean, default:false},

	score:{type: Number, default:0},
	topic_count:{type: Number, default:0},
	reply_count:{type: Number, default:0},
	follwer_count:{type: Number, default:0},
	collect_tag_count:{type: Number, default:0},
	collect_topic_count:{type: Number, default:0},
	create_at:{type: Date, default:Date.now},
	update_at:{type: Date, default:Date.now},
	is_star:{type: Boolean},
	level:{type: String},
	active:{type: Boolean, default: false},

	receive_reply_mail:{type : Boolean, default: false},
	receive_at_mail : { type : Boolean, default : false},
	from_wp : { type : Boolean },

	retrieve_time: { type: Number},
	retrieve_key: {type: String},

	accessToken: { type: String},
});

UserSchema.virtual('isAdvanced').get(function (){
	return this.score > 700 || this.is_star;
});

UserSchema.index({loginname:1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
UserSchema.index({score: -1});
UserSchema.index({accessToken: 1});

UserSchema.methods.findByName = function (name, callback){
	return this.model('User').findOne({name: name}, callback);
};

UserSchema.statics.findByName = function(name, password, callback){
	return this.model('User').findOne({name: name, password: password}, callback);
};

UserSchema.methods.findByIdPsd = function(userid, password, callback){
	return this.model('User').findOne({_id: userid, password: password}, callback);
};

UserSchema.statics.findByIdPsd = function(userid, password, callback){
	return this.model('User').findOne({_id: userid, password: password}, callback);
}

module.exports = mongoose.model('User', UserSchema);
