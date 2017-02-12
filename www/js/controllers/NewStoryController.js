'use strict';

angular
.module("starter")

.controller('NewStoryController',function($scope,$ionicPlatform,$ionicHistory,$cordovaImagePicker,$rootScope,StoryService,ionicMaterialInk,$state,$ionicSlideBoxDelegate,$timeout,$ionicLoading,$mdBottomSheet,$cordovaFile,CategoryService){
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
$scope.newimage = "";

$scope.photoAdd = function(){
	debugger;
	$scope.newimage = "https://static.pexels.com/photos/46710/pexels-photo-46710.jpeg";
}


$ionicPlatform.ready(function(){
	$scope.addImageToStory = function(){
		// Image picker will load images according to these settings
		debugger;
		var options = {
	   maximumImagesCount: 1,
	   width: 800,
	   height: 800,
	   quality: 80
	  };

	  $cordovaImagePicker.getPictures(options)
	    .then(function (results) {
				$scope.newimage = results;

	    }, function(error) {
	      // error getting photos
	    });
	}
});



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
