'use strict';
angular.module('starter')
.controller('PostController',function(PostService,$scope,$stateParams,$ionicModal){
  $scope.posts=[];
  var userid=$stateParams.userid;

  PostService.getUserPosts(1).then(function(posts){
    $scope.posts=posts;
  })
});
