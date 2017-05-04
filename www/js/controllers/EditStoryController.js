angular.module('starter')
.controller('EditStoryController',function($scope,$ionicLoading,StoryService,$state,$stateParams,$ionicPlatform,domainConstant,$cordovaCamera,$timeout,CategoryService,UploadService){
  $scope.$parent.showHeader();
	$scope.$parent.clearFabs();
	$scope.isExpanded = false;
	$scope.$parent.setExpanded(false);
	$scope.$parent.setHeaderFab(false);
  $scope.AddPic = false;

  $scope.modifiedstory = {};
  $scope.modifiedstory.category = {};
  var storyid = $stateParams.storyid;
  $scope.categories = [];
  $scope.newImage = "img/placeholder.png";
  $ionicPlatform.ready(function(){
  	$scope.updatePhoto = function(){
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
  				})
  			},function(err){
  				console.log("Is there some problem while you are taking photo from phone...");
  			});
  	}
  });
  StoryService.getStoryWithID(storyid).then(function(story){
    console.log(story);
    $scope.story = story;
    delete $scope.story.categories;
    delete $scope.story.authors;
    console.log($scope.story);

    CategoryService.getCategories().then(function(categories){
      console.log(categories);
      $scope.categories = categories;
      },function(Err){
        console.log(Err);
      });
  })

  $scope.updateStory = function(story){
    $ionicLoading.show({
  		content: 'Loading',
  		animation: 'fade-in',
  		showBackdrop: true,
  		maxWidth: 200,
  		showDelay: 0
  	});
  StoryService.updateStory(story).then(function(data){
    $ionicLoading.hide();
    $state.go('app.managestory', {storyid:data.id});
  })

  }

})
