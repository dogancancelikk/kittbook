'use strict';
angular
  .module('starter')
  .controller('UserEventController', function($scope, ManageActivityService, UserEventService, $rootScope,$q,$timeout) {
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);

    $scope.activeEvent = [];
    var _userid = $rootScope.globals.currentUser.id;

  ManageActivityService.getActivity().then(function(events) {
      angular.forEach(events, function(event) {
        if (event.isActive == 1) {
          var decideToTime;
          var removeApply = true;
          var changeApply = false;
          var text1;
          var text2;
          var date = new Date();
          var today = parseInt(date.getTime() / 1000);
          var type;

          if (((event.startDate / 1000) - today) >= 0) {
            text1 = "Başvuruların başlamasına ";
            text2 = " kaldı";
            removeApply = false;
            decideToTime = (event.startDate / 1000) - (today);
          } else {
            if (((event.endDate / 1000) - today) >= 0) {
              text1 = "Başvurunun kapanmasına ";
              text2 = " kaldı";
              decideToTime = ((event.endDate / 1000) - today);
              if (event.type == 2) {
                removeApply = false;
                changeApply = true;
              }
          } else {
              debugger;
              removeApply = false;
              ManageActivityService.setInactiveToEvent(event.id).then(function(data) {
                console.log(data);
              }, function(err) {
                console.log(err);
              });
            }
          }
          //Etkinlik Tipinin adını yazdır.
          var type=function(){
            if (event.type == 2) {
              type="Yazar Etkinliği";
              return type;
            }
            else if (event.type==3) {
              type="Yazı gönderme etkinliği";
              return type;
            }
            else {
              type="Kolektif Kitap Etkinliği";
              return type;
            }
          }

          $scope.activeEvent.push({
            id: event.id,
            name: event.name,
            about: event.about,
            image: event.image,
            type:type(),
            decideToTime: decideToTime,
            removeApply: removeApply,
            changeApply: changeApply,
            text1: text1,
            text2: text2
          });

        }
      });
    }, function(err) {
      console.log(err);
    });

    $scope.applyForWriterEvent = function(activityID) {
      UserEventService.createApplyWriterEvent(activityID, _userid).then(function(data) {
        console.log(data);
      }, function(err) {
        console.log(err);
      })
    }



  });
