angular.module('u9blogApp.Services', [])
             .factory('api', function ($http,  $rootScope, $window){
             		var url = "http://localhost:3000";
                                          //var url ="https://u9blogsapp.herokuapp.com";
             		$rootScope.logout = function (){
             			$rootScope.setToken('');
             			$rootScope.setUser('');
             			$window.location.href="#";
             		} ;
             		$rootScope.setToken = function (token){
             			return $window.localStorage.token = token;
             		};

             		$rootScope.getToken = function (){
             			return $window.localStorage.token;
             		};

             		$rootScope.setUser = function (user){
             			return $window.localStorage.user=user;
             		};

             		$rootScope.getUser = function (){
             			return $window.localStorage.user;
             		}

             		$rootScope.isSeesionActive = function (){
             			return $window.localStorage.token ? true : false;
             		};
                                          $rootScope.home = function (){
                                                              return $window.location.href="#";
                                          }
             		return {
             			login : function (user){
             			        return $http.post(url + '/u9blog/user-login', user);
             			},
             			signin : function (user){
             			        return $http.post(url + '/u9blog/user-signin', user);
             			},
                                        create: function (post){
                                                return $http.post(url + '/u9blog/create_topic', post);
                                        },
                                        topicList : function (currentPage, pageSize){
                                                return $http.get(url + '/u9blog/topics',{
                                                        method:'GET',
                                                        params: {
                                                            'pageNo': currentPage,
                                                            'pageSize': pageSize
                                                        },
                                                        responseType: "json"
                                                });
                                        },
                                        getTopic: function (topicId){
                                                return $http.get(url + '/u9blog/topic/' + topicId);
                                        },
                                        topicsGood: function (currentPage, pageSize){
                                                return $http.get(url + '/u9blog/topics_good',{
                                                       method:'GET',
                                                        params: {
                                                            'pageNo': currentPage,
                                                            'pageSize': pageSize
                                                        },
                                                        responseType: "json"
                                                });
                                        },
                                        topicsChange: function (tab, currentPage, pageSize){
                                                return $http.get(url + '/u9blog/topics_change/' + tab,{
                                                        method:'GET',
                                                        params: {
                                                            'pageNo': currentPage,
                                                            'pageSize': pageSize
                                                        },
                                                        responseType: "json"
                                                });
                                        },
                                        topicsUnAnswer: function (){
                                                return $http.get(url + '/u9blog/topics_unanswer');
                                        },
             		}	
             });