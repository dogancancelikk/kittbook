'use strict';

angular.module('starter')
  .filter('categoryFilter', function() {

    return function(items, search) {

        if (!search) {
            return items;
        }

        var category = search;
        if (!category || '' === category) {

            return items;
        }

        return items.filter(function(element, index, array) {
            return element.categoryID === category;
        });

    };
})
.controller('StoryController',function($state,$ionicSlideBoxDelegate,$scope,CategoryService,USER_DATA, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, StoryService,UserService,$rootScope){
	  $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
	  ionicMaterialInk.displayEffect();
	   $timeout(function() {
       ionicMaterialMotion.blinds();
    }, 400);

	$scope.stories=[];
	$scope.categories=[];
	$scope.orderProperty = "createdate";

	StoryService.getStory().then(function(data){
		$scope.stories=data;

	},function(err){
		console.log(err);
	})

  $scope.reportSlideChanged = function(slideNum) {
    setFilterProperty(slideNum);
  }

	CategoryService.getCategories().then(function(data){
			$scope.categories=data;
			$ionicSlideBoxDelegate.update();
		},function(Err){
			console.log(Err);
		});

	$scope.setCategory=function(id){
		console.log($scope.filterProperty);
		$rootScope.activeCategory=id-1;
		setFilterProperty(id);
		$state.go('app.storywithcategories');
	}

	function setFilterProperty(id){
		$rootScope.filterProperty = "";
		$rootScope.filterProperty=id;
	}

	$scope.setOrderProperty=function(id){
		$rootScope.filterProperty = "";
		$scope.â = id;
	}
});
