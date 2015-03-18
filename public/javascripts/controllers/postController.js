angular.module("u9blogApp.Controllers",['ui.bootstrap', 'u9blogApp.Services'])
	.controller("u9blogCtrl", function ($scope, $modal, $log){
		$scope.menu=[
			{name:"首页", code:"home"},
			{name:"文章", code:"artical"}, 
			{name:"关于", code:"about"}, 
			{name:"设置", code:"setting"}
		];
		$scope.logout= function (){
			alert("Hello world!");
		};

		$scope.login = function (){
			var modalInstance = $modal.open({
				templateUrl: '/partials/login.html',
				controller: 'loginCtrl',
			});
		};

		$scope.signin = function (){
			var modalInstance = $modal.open({
				templateUrl: '/partials/signin.html',
				controller: 'signinCtrl',
			});
		}
	})
	.controller("postsCtrl", function ($scope, $window){
		$scope.posts =[
			{post:"Node.js的新特性", title: "Angualr", followe_count:1, reply_count: 2, img:"images/favicon.ico", type:"Aske", timeout: 6},
			{post:"Node.js的应用场景", title: "demo", followe_count:3, reply_count: 70, img:"images/favicon.ico", type:"Share", timeout: 5},
			{post:"U9产品的未来", title: "Angualr", followe_count:1, reply_count: 2, img:"images/favicon.ico", type:"Aske", timeout: 6},
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
		];

		$scope.newpost = function (){
			$window.location.href="#/newpost";
		}
	})
	.controller('newPostCtrl', function ($scope, $window){
		
	})
	.controller('aticalsCtrl', function ($scope){

	})
	.controller('aboutCtrl', function ($scope){

	})
	.controller('settingCtrl', function ($scope){

	})
	.controller('loginCtrl', ['$scope', '$rootScope', '$modalInstance', 'api', '$window', function ($scope, $rootScope, $modalInstance, api, $window){
		if($rootScope.isSeesionActive()){
			$window.location.href = "#";
		}

		$scope.user = {
			name : '',
			pass : ''
		};

		$scope.login = function (){
			var name = $scope.user.name;
			var pass = $scope.user.pass;
			if(!name || !pass){
				alert('请输入用户名和密码');
				return false;
			}
			api.login($scope.user).success(function (data){
				$rootScope.setToken(data._id);
				$rootScope.name = data.name;
				$modalInstance.close();
			}).error(function (data){
				alert(data);
			});
			
		};
		$scope.cancel = function (){
			$modalInstance.dismiss('cancel');
		};
	}])
	.controller('signinCtrl', ['$scope', '$modalInstance', 'api',function ($scope, $modalInstance, api){
		$scope.user = {
			name : '',
			pass : '',
			re_pass : '',
			email:''
		};

		$scope.signin = function (){
			api.signin($scope.user).success(function (data){

				$modalInstance.close();
			}).error(function (data){
				console.log(data);
			});	
			
		};

		$scope.cancel = function (){
			$modalInstance.dismiss('cancel');
		}
	}]);