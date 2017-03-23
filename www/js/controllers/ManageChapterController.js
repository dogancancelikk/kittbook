'use strict';
angular.module('starter')
.controller('ManageChapterController',function($scope,$stateParams,ChapterService){
  var chapter = {};
  debugger;
  chapter.chapterid = $stateParams.chapterid;
  ChapterService.getChapter(chapter.chapterid).then(function(chapterData){
     $scope.chapter = chapterData;
  });
  
});