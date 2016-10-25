'use strict';
angular.module('starter')
.controller('AppliedEventController',function(UserEventService,$scope,$stateParams,ionicMaterialInk){
  //Ionic Material pieces
  //begin
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);


  ionicMaterialInk.displayEffect();
  //end
  var id=$stateParams.appliedeventid;
  $scope.appliedEvent=[];
  UserEventService.getAppliedByEvent(id).then(function(events){
    $scope.appliedEvent=events;
    console.log(events);

  },function(err){
    console.log(err);
  })
})
