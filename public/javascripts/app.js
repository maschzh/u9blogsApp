angular.module('u9blogApp', ["ngResource","ngRoute","u9blogApp.Controllers"])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider.when('/',{
			controller:'postsCtrl',
			templateUrl:"/partials/postlist.html"
		})
		.when("/artical",{
			controller:'aticalsCtrl',
			templateUrl:'/partials/post.html'
		})
		.when("/about",{
			controller:'aboutCtrl',
			templateUrl:'/partials/about.html'
		})
		.when("/setting",{
			controller:'settingCtrl',
			templateUrl:'/partials/setting.html'
		})
		.otherwise({redirectTo:'/'});
		//$locationProvider.html5Mode(true);
	});