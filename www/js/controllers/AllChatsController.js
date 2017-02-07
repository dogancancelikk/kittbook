'use strict';
angular.module('starter')
.controller('AllChatsController',function($scope,ChatService,$timeout,ionicMaterialInk,ionicMaterialMotion,$rootScope,$ionicLoading){
  
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);
  ionicMaterialInk.displayEffect();

  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});

   $timeout(function() {
     ionicMaterialMotion.blinds();
  }, 400);
  var _userid=$rootScope.globals.currentUser.id;
  ChatService.getAllMessages(_userid).then(function(data){
    $scope.messages=data;
    $ionicLoading.hide();
  },function(err){
    console.log(err);
  });

})
