'use strict';
angular
.module('starter')
.controller('LoginController',function($rootScope,$scope, $timeout, $stateParams,$cordovaOauth,ionicMaterialInk,AuthService,$state,$ionicHistory,$http){
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

  $scope.facebooklogin = function () {
          // Calling $cordovaOauth.facebook for login facebook.
        // Format:
        // $cordovaOauth.facebook(APP_ID,[FACEBOOK_PERMISION])
        // For APP_ID is window.globalVariable.oAuth.facebook from www/js/app.js at globalVariable session.
        $cordovaOauth.facebook(window.globalSocialConnectVariable.oAuth.facebook, ["email"]).then(function (result) {
        //After call cordovaOauth.facebook it will return access_token for you to calling facebook API.
        $scope.accessToken = result.access_token;
        // Calling http service for getting user profile from facebook.
        // By send parameter access_token , fields, format.
        $http.get("https://graph.facebook.com/v2.4/me", {
            params: {
                access_token: result.access_token,
                fields: "email,first_name,last_name,picture",
                format: "json"
            }
        }).then(function (result) {
            // Success retrieve data by calling http service.
            // Store user profile information from facebook API to userInfo variable.
              console.log(result);
        });
          },function (error) {
                // Error retrieve data.
                console.log(error);
            });


};// End login.



});
