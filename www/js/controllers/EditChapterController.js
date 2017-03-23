'use strict';
angular.module('starter')
.controller('EditChapterController',function($scope,ChapterService,$stateParams,$sce){

  $scope.$parent.showHeader();
	$scope.$parent.clearFabs();
	$scope.isExpanded = false;
	$scope.$parent.setExpanded(false);
	$scope.$parent.setHeaderFab(false);
//   var chapterValues = {};
//   $scope.chapter={};
//   $scope.chapter.text;
//   $scope.chapter.name;
//   $scope.chapter.tags={};
  var chapterid = $stateParams.chapterid;
  ChapterService.getChapter(chapterid).then(function(chapter){
//     chapterValues = chapter;
//     $scope.chapter.text = $sce.trustAsHtml(chapter.text);
//     $scope.chapter.name = chapter.name;
//     $scope.chapter.tags = chapter.tags;
    $scope.chapter = chapter;
    console.log(chapter);
    
  });
  $scope.updateChapter = function(chapter){
      ChapterService.updateChapter(chapter).then(function(data){
        console.log(data);
      })
  }
});