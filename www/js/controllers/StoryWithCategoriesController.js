'use strict';

angular.module('starter')
.controller('StoryWithCategoriesController',function($state,$scope,CategoryService,USER_DATA,$ionicSlideBoxDelegate ,$ionicLoading, $stateParams, $timeout,
																											ionicMaterialInk, ionicMaterialMotion,StoryService,UserService,$rootScope){

console.log("giriş yapıldı");

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
var categoryid = $stateParams.categoryid;
$scope.activeCategory = categoryid-1;
$scope.stories=[];
$scope.categories=[];
$scope.orderProperty = "createDate";

	getStories(categoryid);

	function getStories(categoryid){
	StoryService.getStoryWithCategories(categoryid).then(function(data){
		$scope.stories=[]
		$scope.stories=data;
		console.log(data);
		 $ionicLoading.hide();

	},function(err){
		console.log(err);
	});
	}

function setFilterProperty(slideNum){
	categoryid = slideNum;
	getStories(categoryid);
}

$scope.reportSlideChanged = function(slideNum) {
	$ionicLoading.show({
 content: 'Loading',
 animation: 'fade-in',
 showBackdrop: true,
 maxWidth: 200,
 showDelay: 0
});

  setFilterProperty(slideNum);
}

CategoryService.getCategories().then(function(data){
		$scope.categories=data;
		$ionicSlideBoxDelegate.update();
	},function(Err){
		console.log(Err);
	});

});
