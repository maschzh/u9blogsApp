angular.module('u9blogApp.Services', [])
             .factory('api', function ($http,  $rootScope, $window){
             		var url = "http://localhost:3000";

             		$rootScope.logout = function (){
             			$rootScope.setToken('');
             			$window.location.href="#";
             		} ;
             		$rootScope.setToken = function (token){
             			return $window.localStorage.token = token;
             		};

             		$rootScope.getToken = function (){
             			return $window.localStorage.token;
             		};

             		$rootScope.isSeesionActive = function (){
             			return $window.localStorage.token ? true : false;
             		};

             		return {
             			login : function (user){
             				return $http.post(url + '/u9blog/user-login', user);
             			},
             			signin : function (user){
             				return $http.post(url + '/u9blog/user-signin', user);
             			},
             		}	
             });