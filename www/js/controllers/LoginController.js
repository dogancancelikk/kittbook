'use strict';
angular
.module('starter')
.controller('LoginController',function($rootScope,$scope, $timeout, $stateParams, ionicMaterialInk,AuthService,$state,$ionicHistory,$http){
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
  $scope.data = {};

  //login (AuthService servisi kullanılıyor(services.js))
  $scope.login = function (data) {

    AuthService.login(data.username, data.password).then(function (authenticated) {
      $ionicHistory.nextViewOptions({
      disableBack: true
    });
      $state.go('app.home', {});
    }, function (err) {
      alert('hata var');
    });
  };



});
