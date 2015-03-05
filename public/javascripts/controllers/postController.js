angular.module("u9blogApp.Controllers", [])
	.controller("u9blogCtrl", function ($scope){
		$scope.menu=["Home","Aticals", "About", "Setting"];
	})
	.controller("postsCtrl", function ($scope){
		$scope.posts =[
			{post:"A story is about angular", title: "Angualr", followe_count:1, reply_count: 2, img:"images/favicon.ico", type:"Aske", timeout: 6},
			{post:"A post is about demo", title: "demo", followe_count:3, reply_count: 70, img:"images/favicon.ico", type:"Share", timeout: 5},
			{post:"A story is about angular", title: "Angualr", followe_count:1, reply_count: 2, img:"images/favicon.ico", type:"Aske", timeout: 6},
			{post:"A post is about demo", title: "demo", followe_count:3, reply_count: 70, img:"images/favicon.ico", type:"Share", timeout: 5},
			{post:"A story is about angular", title: "Angualr", followe_count:1, reply_count: 2, img:"images/favicon.ico", type:"Aske", timeout: 6},
			{post:"A post is about demo", title: "demo", followe_count:3, reply_count: 70, img:"images/favicon.ico", type:"Share", timeout: 5},
			{post:"A story is about angular", title: "Angualr", followe_count:1, reply_count: 2, img:"images/favicon.ico", type:"Aske", timeout: 6},
			{post:"A post is about demo", title: "demo", followe_count:3, reply_count: 70, img:"images/favicon.ico", type:"Share", timeout: 5},
			{post:"A story is about angular", title: "Angualr", followe_count:1, reply_count: 2, img:"images/favicon.ico", type:"Aske", timeout: 6},
			{post:"A post is about demo", title: "demo", followe_count:3, reply_count: 70, img:"images/favicon.ico", type:"Share", timeout: 5},
		];

		$scope.user={
			name: "maschzh",
			score: 890
		};
		$scope.scores=[
			{user:"maschzh", score: 8000},
			{user:"chenzhi", score: 5000},
		]
	})
	.controller('aticalsCtrl', function ($scope){

	})
	.controller('aboutCtrl', function ($scope){

	})
	.controller('settingCtrl', function ($scope){

	});