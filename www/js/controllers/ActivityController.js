'use strict';

angular.module('starter')

.controller('ActivityController',function ($scope,$http,$timeout,$ionicLoading,UserService,ionicMaterialMotion,ActivityService, ionicMaterialInk,$stateParams) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
    var userid = $stateParams.userid;
    console.log(userid);
    $scope.activities=[];
    UserService.getUserDetail(userid).then(function(user){
      $scope.user = user;
      $ionicLoading.hide();
    })
    ActivityService.getUserActivities(userid).then(function(data) {
      if (data) {
        $scope.userActivities = data;
        console.log(data);
      }
    });


})
