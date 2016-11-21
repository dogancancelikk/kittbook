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


.controller('StoryController',function($mdBottomSheet, $mdToast, $mdDialog,$state,$ionicSlideBoxDelegate,$scope,CategoryService,USER_DATA,$ionicLoading, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, StoryService,UserService,$rootScope,$ionicTabsDelegate){
  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});
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
	$scope.orderProperty = "createDate";

	StoryService.getStory().then(function(data){
		$scope.stories=data;
    console.log(data);
    $ionicLoading.hide();

	},function(err){
		console.log(err);
	});


  $scope.reportSlideChanged = function(slideNum) {
    setFilterProperty(slideNum);
  }

	CategoryService.getCategories().then(function(data){
			$scope.categories=data;
			$ionicSlideBoxDelegate.update();
      $ionicLoading.hide();
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
		console.log(id);
		if(id =='createDate'){
			$ionicTabsDelegate.select(0,false);
		}else if(id == 'storyrate'){
			$ionicTabsDelegate.$getByHandle('myTabs').select(1,false);
		}
		$rootScope.filterProperty = "";
		$scope.orderProperty = id;
	}
});
