'use strict';

angular.module('starter')

.controller('FollowersController',function ($scope,$timeout, ionicMaterialInk, ionicMaterialMotion,domainConstant,RelationshipService) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
  //deneme yap.

    $scope.followers=[];

    RelationshipService.getFollowers(1).then(function (data) {
        debugger;
        $scope.followers=data;
    })

})
