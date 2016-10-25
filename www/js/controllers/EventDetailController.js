'use strict';
  angular
  .module('starter')
  .controller('EventDetailController',function($scope,ionicMaterialMotion,ionicMaterialInk,$timeout,$stateParams,ManageActivityService){
    //Begin
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);	

    // Set Ink
    ionicMaterialInk.displayEffect();
    //comment deneme
    //End
    
    $scope.eventid=$stateParams.eventid;
    console.log($scope.eventid,$stateParams.eventid);
    
    ManageActivityService.getActivityWithId($stateParams.eventid).then(function(event){
      $scope.event=event;
    })
    
  });