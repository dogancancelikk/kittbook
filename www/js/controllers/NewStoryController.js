'use strict';

angular
.module("starter")

.controller('NewStoryController',function($scope,$ionicHistory,$rootScope,StoryService,ionicMaterialInk,$state,$ionicSlideBoxDelegate,$timeout,$ionicLoading,$mdBottomSheet,$cordovaFile,CategoryService){
	$scope.$parent.clearFabs();
	$timeout(function() {
			 $scope.$parent.hideHeader();
	 }, 0);
	ionicMaterialInk.displayEffect();
	$scope.story = {};
 	$scope.story.description = '';
 	$scope.story.tags = [];
 	$scope.story.ownerID=$rootScope.globals.currentUser.id;
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	$scope.deneme = function(){

	}
	$scope.getContent = function(data) {
	console.log('Editor content:',data.tinymceModel);
	};
	$scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
 	 };

	CategoryService.getCategories().then(function(data){
		console.log(data);
		$scope.categories=data;
		$ionicLoading.hide();
	},function(Err){
		console.log(Err);
	});

// 	$scope.tinymceOptions = {
// 				plugins: 'print wordcount fullscreen',
//         toolbar: "undo redo bold italic,fullscreen",
// 				menubar: false,
// 				theme: 'modern',
// 				height:2800,
// 				fullscreen_new_window : true
// 		};


  $scope.createStory=function(story){
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
  	StoryService.addStory(story).then(function(data){
		$ionicHistory.nextViewOptions({
	      disableBack: true
	    });
		$state.go('app.managestory',{storyid:data.id});
  	},function(err){
  		console.log("Hata var" + err);
  	});
  }


});
