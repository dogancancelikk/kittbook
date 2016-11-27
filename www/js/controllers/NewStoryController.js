'use strict';

angular
.module("starter")

.controller('NewStoryController',function($scope,StoryService,ionicMaterialInk,$state,$ionicSlideBoxDelegate,$timeout,$ionicLoading,CategoryService){
	$scope.$parent.clearFabs();
	$timeout(function() {
			 $scope.$parent.hideHeader();
	 }, 0);
	ionicMaterialInk.displayEffect();
  $scope.data = {};

		$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});

	$scope.getContent = function(data) {
	console.log('Editor content:',data.tinymceModel);
	};
	$scope.setContent = function() {
    $scope.tinymceModel = 'Time: ' + (new Date());
  };

		CategoryService.getCategories().then(function(data){
			$scope.categories=data;
			$ionicSlideBoxDelegate.update();
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


  $scope.createStory=function(data){
  	StoryService.addStory(data.name,3,data.description,0).then(function(data){

  		$state.go('app.storydetail',{storyid:data.id});
  	},function(err){
  		console.log("Hata var" + err);
  	})
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
    console.log($scope.data);
  };

});
