'use strict';
angular.module('starter')
.controller('NotificationController',function($scope,NotificationService,$rootScope,$ionicLoading,$state){
  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});

  //begin
 $scope.$parent.showHeader();
 $scope.$parent.clearFabs();
 $scope.isExpanded = true;
 $scope.$parent.setExpanded(true);
 $scope.$parent.setHeaderFab(false);

  var username = $rootScope.globals.currentUser.username;
  $scope.image = $rootScope.globals.currentUser.image;
   NotificationService.getUserNotifications(username).then(function(data) {
        $ionicLoading.hide();
        $rootScope.userNotifications = data;
    });

    $scope.readNotification = function(notification) {
      $ionicLoading.hide();
      if (notification.hasRead == 0) {
        NotificationService.readNotification(notification.id);

      }
      $state.go('app.profile',{userid:notification.sendBy});
    }
})
