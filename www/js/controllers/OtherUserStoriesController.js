'use strict';
angular.module('starter')
.controller('OtherUserStoriesController',function($scope,$stateParams,$timeout,ionicMaterialInk,ionicMaterialMotion,StoryService){
  //Begin
	// Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
//     // Delay expansion
//     $timeout(function() {
//         $scope.isExpanded = false;
//         $scope.$parent.setExpanded(false);
//     }, 300);

    // Set Motion
    ionicMaterialMotion.blinds();
		// Set Ink
// 		$scope.$on('ngLastRepeat.mylist',function(e) {
// 			 ionicMaterialInk.displayEffect();
// 		});
   ionicMaterialInk.displayEffect();
    //End
  var userid=$stateParams.userid
  $scope.userStories=[];
  StoryService.getUserPublishedStory(userid).then(function(data){
    console.log(data);
    $scope.userStories=data;
  },function(err){
    console.log(err);
  })



})
