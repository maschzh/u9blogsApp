angular.module('u9blogApp', ["ngResource","ngRoute","u9blogApp.Controllers"])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider.when('/Home',{
			controller:'postsCtrl',
			templateUrl:"/partials/postlist.html"
		})
		.when("/Aticals",{
			controller:'aticalsCtrl',
			templateUrl:'/partials/post.html'
		})
		.when("/About",{
			controller:'aboutCtrl',
			templateUrl:'/partials/about.html'
		})
		.when("/Setting",{
			controller:'settingCtrl',
			templateUrl:'/partials/setting.html'
		})
		.otherwise({redirectTo:'/Home'});
		//$locationProvider.html5Mode(true);
	});