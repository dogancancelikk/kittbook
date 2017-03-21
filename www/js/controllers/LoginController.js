'use strict';
angular
.module('starter')
.controller('LoginController',function($rootScope,$scope, ngFB, $timeout, $stateParams,$cordovaOauth,AuthService,$state,$ionicHistory,$http){

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

  $scope.facebooklogin = function () {

      ngFB.login({scope: 'email,first_name,last_name,picture'}).then(function (response) {
          if (response.status === 'connected') {
              console.log('Facebook login succeeded');
              console.log(response);
          } else {
              $ionicPopup.alert({
                  title: 'Unauthorized!',
                  template: 'User cancelled login or did not fully authorize.'
             });
          }
      });
  };// End login.
});
