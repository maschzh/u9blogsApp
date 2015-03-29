angular.module('u9blogApp.Directives',[])
	.directive('autoFocus', function (){
		return {
			restrict: 'AC',
			link: function (scope, element, attrs){
				scope.$watch(attrs.autoFocus, function (value){
					if(vaule === true){
						element[0].focus();
						element[0].select();
					}
				});
			}
		}
	})
	.directive('paging', function (){
			return {
				restrict: 'E',
				template: '',
				replace: true,
				link : function (scope, element, attrs){
					scope.$watch('numPages', function (value){
						scope.pages = [];
						for(var i = 1; i <= value; i++){
							scope.pages.push(i);
						}
						if(scope.currentPage > value){
							scope.selectPage(value);
						}
					});
					scope.selectNext = function (){
						if(!scope.onNext()){
							scope.selectPage(scope.currentPage + 1);
						}
					};
					scope.onPrevious = function (){
						return scope.currentPage ==1;
					};
					scope.onNext = function (){
						return scope.currentPage == scope.numPages;
					};
					scope.isActive = function (page){
						return scope.currentPage ===page;
					};
					scope.selectPage = function (page){
						if(!scope.isActive(page)){
							scope.currentPage = page;
							scope.onSelectPage(page);
						}
					};
					scope.selectPrevious = function (){
						if(!scope.onPrevious()){
							scope.selectPage(scope.currentPage - 1);
						}
					};
					
				}
			}
		});
