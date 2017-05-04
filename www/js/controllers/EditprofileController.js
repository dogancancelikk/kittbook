'use strict';
angular.module('starter')

.controller('EditprofileController',function ($scope,$http,$state,$timeout,$ionicLoading,UserService,$stateParams,$ionicPlatform,UploadService,domainConstant,$cordovaCamera) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    var userid = $stateParams.userid;
    UserService.getUserDetail(userid).then(function(user){
      $scope.user = user;
      $ionicLoading.hide();
    });

    $scope.updateProfile = function(){
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      UserService.update($scope.user).then(function(data){
        debugger;
        console.log(data);
        $ionicLoading.hide();
        $state.go('app.profile', {userid:data.id});
      })

    }


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
    						$scope.user.image = imageUnsavedName;
    						$scope.newImage = imageUnsavedName;
    				})


    			},function(err){
    				console.log("Is there some problem while you are taking photo from phone...");
    			});
    	}

    });
});
