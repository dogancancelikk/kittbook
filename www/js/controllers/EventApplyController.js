'use strict';
  angular
  .module('starter')
  .controller('EventApplyController',function($scope,$stateParams,UserEventService,$rootScope,$ionicPopup,$state){
      $scope.event = {};
      var _userid=$rootScope.globals.id;

    $scope.applyEvent = function(){
      debugger;
      $scope.event.userID = _userid;
      $scope.event.activityID=$stateParams.eventid;
      UserEventService.sendTextEvent(event).then(function(eventdata){
        console.log(eventdata);
        var alertPopup=$ionicPopup.alert({
         title: 'Başvuru',
         template: 'Başvurunuz başarı ile gerçekleştirildi'
       });
       alertPopup.then(function(res) {
          $state.go('app.userevent',{});
          console.log(res);
        });
      },function(err){
        console.log(err);
      });
    }

  });
