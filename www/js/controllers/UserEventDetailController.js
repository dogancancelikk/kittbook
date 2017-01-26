'use strict';
angular.module('starter')
.controller('UserEventDetailController',function($stateParams,$scope,ManageActivityService,$state){
  var id = $stateParams.id;
  $scope.event = {};
  ManageActivityService. getActivityWithId(id).then(function(event){
    $scope.event = event;
    console.log($scope.event);
  });
  $scope.applyForWriterEvent = function(id){
    $state.go('app.eventApply',{eventid:id});
  }
})
