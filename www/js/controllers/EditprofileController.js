'use strict';
angular.module('starter')

.controller('EditprofileController',function ($scope,$http,$timeout,$ionicLoading,UserService,$stateParams,ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

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
    UserService.getUserDetail(userid).then(function(user){
      $scope.user = user;
      console.log(user);
      $ionicLoading.hide();
    });
});
