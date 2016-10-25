'use strict';
angular
.module('starter')
.controller('NewChapterController',function($scope,ionicMaterialInk,ChapterService,$stateParams,$state,$ionicSlideBoxDelegate){

	//name,storyID, userID, text,chapterNumber
	//viewdan alınan name,text,chapterNumber createChapter(data)
  var storyid=$stateParams.storyid;
	console.log(storyid);
  $scope.$parent.clearFabs();
  $scope.data = {};
  //login (AuthService servisi kullanılıyor(services.js))
  $scope.createChapter=function(data){
    console.log(data);
  	ChapterService.addStoryChapter(data.name,storyid,3,data.text,5).then(function(chapterdata){
  		console.log(chapterdata);
  		//$state.go('app.storydetail',{storyid:chapterdata.storyID});
      console.log(data);
      $state.go('app.home');

  	},function(err){
  		console.log(err);
  	});
  		
  }
	
	  $scope.starttowrite = function() {
    $ionicSlideBoxDelegate.next();
    console.log($scope.data);
  };
	
  ionicMaterialInk.displayEffect();

});