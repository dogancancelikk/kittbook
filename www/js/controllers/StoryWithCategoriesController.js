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


.controller('StoryWithCategoriesController',function($mdBottomSheet, $mdToast, $mdDialog,$state,$ionicSlideBoxDelegate,
  $scope,CategoryService,USER_DATA,$ionicLoading, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,
  StoryService,UserService,$rootScope,$ionicTabsDelegate){
    debugger;

  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});

       $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    // $timeout(function() {
    //     $scope.$parent.hideHeader();
    // }, 0);
	  ionicMaterialInk.displayEffect();
	   $timeout(function() {
       ionicMaterialMotion.blinds();
    }, 400);

	$scope.stories=[];
	$scope.categories=[];
	$scope.orderProperty = "createDate";

	StoryService.getStory().then(function(data){
		console.log(data);
		$scope.stories=data;

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
		},function(Err){
			console.log(Err);
		});

});
