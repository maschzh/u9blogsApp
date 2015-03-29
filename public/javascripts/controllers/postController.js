angular.module("u9blogApp.Controllers",['ui.bootstrap', 'u9blogApp.Services','u9blogApp.Filters','u9blogApp.Directives'])
	.constant('tabActiveClass', "btn-success")
	.constant('postPageCount', 20)
	.controller("u9blogCtrl", function ($scope, $modal, $log, $rootScope, api){
		$scope.menu=[
			{name:"首页", code:"home"},
			{name:"文章", code:"artical"}, 
			{name:"关于", code:"about"}, 
			{name:"设置", code:"setting"}
		];
		$scope.logout= function (){
			$rootScope.logout();
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
		};

		$scope.user = $rootScope.getUser();
	})
	.controller("postsCtrl", function ($scope, $window, api, $rootScope, $routeParams, $filter, tabActiveClass, postPageCount){
		/* tab change 
		$scope.tabs=["全部","精华","问答","分享","招聘"
			//{"name": "全部", "code": "all"},
			//{"name": "精华", "code": "good"},
			//{"name": "问答", "code": "ask"},
			//{"name": "分享", "code": "share"},
			//{"name": "招聘", "code": "job"},
		];
		var selectedTab = null;
		$scope.selectTab = function (newTab){
			selectedTab = newTab;
			$scope.selectedPage = 1;
		}
		$scope.getTabClass = function (tab){
			return selectedTab == tab ? tabActiveClass : "";
		}*/
		//************分页处理***********
		$scope.currentPage = 1;
		$scope.pageSize = postPageCount;
		$scope.numPages = 1;
		$scope.pages = [];

		$scope.getposts = function(){
			api.topicList($scope.currentPage, $scope.pageSize).success(function (data){
				$scope.posts=data.topics;
				$scope.numPages= data.pageCount;
			});
		}
		$scope.getposts();

		$scope.onSelectPage = function (page){
			api.topicList($scope.currentPage, $scope.pageSize).success(function (data){
				$scope.posts=data.topics;
				$scope.numPages= data.pageCount;
			});
		};
		//************分页处理***********

		$scope.user={
			score: 890
		};
		$scope.user.name = $rootScope.getUser();

		$scope.scores=[
			{user:"maschzh", score: 8000},
			{user:"chenzhi", score: 5000},
		];
		

		$scope.getAll = function(){
			$scope.currentPage = 1;
			$scope.getposts();
		};
		$scope.tabCss = {tab4: "btn-success", tab0: "none", tab1:"none", tab2: "none",tab3: "none"};
		$scope.getTabs = function (tab){
			$scope.currentPage = 1;
			$scope.tabCss = {css:'btn-success'};
			if(tab=="all"){
				$scope.tabCss = {tab4: "btn-success", tab0: "none", tab1:"none", tab2: "none",tab3: "none"};
				$scope.getposts();
				return false;
			} else if(tab=="good"){
				$scope.tabCss = {tab4: "none", tab0: "btn-success", tab1:"none", tab2: "none",tab3: "none"};
				api.topicsGood($scope.currentPage, $scope.pageSize).success(function (data){
					$scope.posts=data.topics;
					$scope.numPages= data.pageCount;
				});
				return false;
			} else if(tab=="ask"){
				$scope.tab = "问答";
				$scope.tabCss = {tab4: "none", tab0: "none", tab1:"btn-success", tab2: "none",tab3: "none"};
			} else if(tab =="share"){
				$scope.tab = "分享";
				$scope.tabCss = {tab4: "none", tab0: "none", tab1:"none", tab2: "btn-success",tab3: "none"};
			} else {
				$scope.tab = "招聘";
				$scope.tabCss = {tab4: "none", tab0: "none", tab1:"none", tab2: "none",tab3: "btn-success"};
			}
			api.topicsChange($scope.tab, $scope.currentPage, $scope.pageSize).success(function (data){
				$scope.posts=data.topics;
				$scope.numPages= data.pageCount;
			});
		};

		$scope.newpost = function (){
			$window.location.href="#/create";
		}

		api.topicsUnAnswer().success(function (data){
			$scope.unanwser =  data;
		});

		if($routeParams.top_id!==undefined){
			api.getTopic($routeParams.top_id).success(function (data){
				$scope.post = data;
			});
		}
	})
	.controller('unAnswerCtrl', function ($scope, $window, api, $rootScope){
		api.topicsUnAnswer().success(function (data){
			$scope.unanwser =  data;
		});
	})
	.controller('newPostCtrl', function ($scope, $window, api, $rootScope){
		var post = $scope.post ={
			title: '',
			content: '',
			tab:'',
			author_id:''
		}; 
		post.types =[{'name':'问答' ,'code':1},{'name':'分享', 'code':2},{'name':'招聘','code':3}];
		post.type=post.types[-1];
		//selectChange event
		$scope.selectChange = function (){
			post.tab = post.value.name;
		};
		$scope.create = function (){
			post.author_id = $rootScope.getToken();
			api.create(post).success(function (data){
				$window.location.href="#";
			}).error(function (data){
				alert(data);
			});
		}
	})
	.controller('postCtrl', function ($scope, $window, api, $rootScope, $routeParams, $timeout){
		$scope.post=[];
		if($routeParams.top_id!=='undefined'){
			api.getTopic($routeParams.top_id).success(function (data){
				$scope.post = data;
			});
		}

		api.topicsUnAnswer().success(function (data){
			$scope.posts =  data;
		});

		$scope.post.replyTocontent = "";
		$scope.like_count = 0;
		$scope.isDisplay = false;
		$scope.like = function (){
			$scope.like_count ++;
		}
		$scope.reply = function (){
			$timeout(function (){
				$scope.isDisplay = true;
			}, 200);
		};
		$scope.replyform = function (){

		};
		$scope.newReply = function (){

		};
		$scope.cancel = function (){
			$timeout(function (){
				$scope.isDisplay = false;
				$scope.post.replyTocontent = "";
			}, 200);
		};
		$scope.cancelReply = function (){
			$scope.post.replycontent="";
		};
	})
	.controller('aticalsCtrl', function ($scope, api){
		api.topicsUnAnswer().success(function (data){
			$scope.posts =  data;
		});
	})
	.controller('aboutCtrl', function ($scope){
	})
	.controller('settingCtrl', function ($scope){
	})
	.controller('loginCtrl', function ($scope, $rootScope, $modalInstance, api, $window){
		if($rootScope.isSeesionActive()){
			$window.location.href = "#";
		}
		$scope.user = {
			name : '',
			pass : ''
		};
		$scope.login = function (){
			$scope.error="";
			var name = $scope.user.name;
			var pass = $scope.user.pass;
			if(!name || !pass){
				$scope.error='请输入用户名和密码';
				return false;
			}
			api.login($scope.user).success(function (data){
				if(data.error){
					$scope.error=data.error;
				} else {
					$rootScope.setToken(data._id);
					$rootScope.setUser(data.name);
					$modalInstance.close();
					$window.location.href="#";
				}
			}).error(function (data){
				alert(data);
			});
			
		};
		$scope.cancel = function (){
			$modalInstance.dismiss('cancel');
		};
	})
	.controller('signinCtrl',function ($scope, $modalInstance, api, $rootScope, $window){
		$scope.user = {
			name : '',
			pass : '',
			re_pass : '',
			email:''
		};

		$scope.signin = function (){
			$scope.error="";
			if(!$scope.user.name){
				$scope.error = "请输入用户名";
				return false;
			}
			if(!$scope.user.pass){
				$scope.error ="请输入密码";
				return false;
			}
			if($scope.user.pass !== $scope.user.re_pass){
				$scope.error = "两次输入的密码不一致，请重新输入！";
				return false;
			}
			if(!$scope.user.email){
				$scope.error="请输入邮箱号";
				return false;
			}
			api.signin($scope.user).success(function (data){
				if(data.error){
					$scope.error=data.error;
				} else {
					$rootScope.setToken(data._id);
					$rootScope.setUser(data.loginname);
					$modalInstance.close();
					$window.location.href="#";
				}
			}).error(function (data){
				console.log(data);
			});	
			
		};

		$scope.cancel = function (){
			$modalInstance.dismiss('cancel');
		}
	});