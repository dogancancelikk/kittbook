'use strict';

angular
.module("starter")

.controller('NewStoryController',function($scope,$ionicPlatform,UploadService,$ionicHistory,$cordovaImagePicker,$rootScope,StoryService,Upload,domainConstant,
	ionicMaterialInk,$jrCrop,$state,$ionicSlideBoxDelegate,$cordovaCamera,$timeout,$ionicLoading,$mdBottomSheet,$cordovaFile,$cordovaFileTransfer,CategoryService){

	$scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);
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
$scope.newImage = "";
$scope.newImage = "img/placeholder.png";
$ionicPlatform.ready(function(){
	$scope.addImageToStory = function(){
			var options2 = {
				quality:100,
				destinationType:Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				allowEdit:true,
				targetWidth:250,
				targetHeight:340,
				encodingType:Camera.EncodingType.JPEG,
				correctOrientation: true,
				popoverOptions:CameraPopoverOptions,
				saveToPhotoAlbum:false
			}

			$cordovaCamera.getPicture(options2).then(function(imageURI){
				debugger;
				var image={};
				image.imageName = imageURI;
				UploadService.uploadPhoto(image).then(function(fileName){
						var imageUnsavedName = domainConstant.image +fileName.imageName +'.jpg';
						$scope.story.image = imageUnsavedName;
						$scope.newImage = imageUnsavedName;
				})


			},function(err){
				console.log("Is there some problem while you are taking photo from phone...");
			});
	}

});

	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
		console.log(index);
	};
	$scope.nextSlide = function() {
	  $ionicSlideBoxDelegate.next();
	};
	$scope.tSlide = function() {
		$ionicSlideBoxDelegate.previous();
	};
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
