'use strict';

angular.module('starter')

.controller('ActivityController',function ($scope,$http,$timeout,ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    $scope.activities=[];
    $http.get('http://localhost:9595/api/activity/getuseractivity/1').success(function (data) {
        $scope.activities=data;
    });


})
