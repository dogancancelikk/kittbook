'use strict';
angular.module('starter')
.controller('AllChatsController',function($scope,ChatService,$timeout,ionicMaterialInk,ionicMaterialMotion,$rootScope){
  ionicMaterialInk.displayEffect();
   $timeout(function() {
     ionicMaterialMotion.blinds();
  }, 400);
  var _userid=$rootScope.globals.currentUser.id;
  ChatService.getAllMessages(_userid).then(function(data){
    $scope.messages=data;
  },function(err){
    console.log(err);
  });

})
