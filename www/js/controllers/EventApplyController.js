'use strict';
  angular
  .module('starter')
  .controller('EventApplyController',function($scope,$stateParams,UserEventService,$rootScope,$ionicPopup,$state){

      $scope.data = {};
      var _userid=$rootScope.globals.currentUser.id;

    $scope.applyEvent=function(data){

      var activityID=$stateParams.eventid;
      UserEventService.createApplyEvent(activityID,data.text,data.title,data.about,_userid).then(function(eventdata){


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
