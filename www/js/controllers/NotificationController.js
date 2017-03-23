'use strict';
angular.module('starter')
.controller('NotificationController',function($scope,NotificationService,$rootScope){
  debugger;
  $rootScope.userNotifications = {};
  var username = $rootScope.globals.currentUser.username;
  $scope.image = $rootScope.globals.currentUser.image;
   NotificationService.getUserNotifications(username).then(function(data) {
     console.log(data);
        $rootScope.userNotifications = data;
    })
})