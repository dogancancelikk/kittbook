'use strict';
angular
.module('starter')
.controller('NewChapterController',function($ionicHistory,$scope,$timeout,ionicMaterialInk,
  $mdBottomSheet,ChapterService,StoryService,$stateParams,$state,$ionicSlideBoxDelegate,$rootScope,$ionicLoading){
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);
  ionicMaterialInk.displayEffect();
  console.log($ionicHistory.currentHistoryId());
  $ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
  var storyid=$stateParams.storyid;
  $scope.chapter = {};
  $scope.chapter.id = 0;
  $scope.chapter.storyID = storyid;
  $scope.chapter.userID = $rootScope.globals.currentUser.id;
  $scope.chapter.tags=[];

  StoryService.getStoryWithID(storyid).then(function(story){
    console.log(story);
    $ionicLoading.hide();
    $scope.story = story;
  })
	console.log(storyid);

  $scope.data = {};
  //login (AuthService servisi kullanılıyor(services.js))
  $scope.createChapter=function(chapter){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    ChapterService.addChapter(chapter).then(function(data){
      console.log(data);
      $state.go('app.managestory',({storyid:storyid}));
      $ionicLoading.hide();
    })
  	// ChapterService.addStoryChapter(data.name,storyid,3,data.text,5).then(function(chapterdata){
  	// 	console.log(chapterdata);
  	// 	//$state.go('app.storydetail',{storyid:chapterdata.storyID});
    //   console.log(data);
    //   $state.go('app.home');
  	// },function(err){
  	// 	console.log(err);
  	// });
  }

});
