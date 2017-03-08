'use strict';
angular
  .module('starter')
  .filter('eventFilter', function() {
    return function(items, search) {
      var date = new Date();
      var today = parseInt(date.getTime() / 1000);
        if (!search) {
            return items;
        }

        var eventType = search;
        if (!eventType || '' === eventType) {
            return items;
        }

        return items.filter(function(element, index, array) {
            if(eventType == 2){
              return (element.startDate/1000) <= today;
            }else if (eventType == 1) {
              return (element.startDate/1000) > today;
            }
        });

    };
  })
.filter('eventTypeFilter', function(){
  return function(items,search){
    if(!search){
      return items
    }

    var eventType = search;
    if(!eventType || '' === eventType){
      return items;
    }

    return items.filter(function(element,index,array){
      if(eventType == 1){
        return element.eventType === 1;
      }else if(eventType == 2){
        return element.eventType === 2;
      }else if(eventType == 3){
        return element.eventType === 3;
      }
    });

  }
})
  .controller('UserEventController', function($scope,ionicMaterialInk, ManageActivityService, UserEventService,$ionicModal,$mdSidenav,$mdUtil,$rootScope,$q,$timeout,$ionicTabsDelegate) {
    // $scope.$parent.showHeader();
    // $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);
    $scope.$parent.clearFabs();
    $scope.$parent.hideHeader();
    ionicMaterialInk.displayEffect();

  $timeout( function() {
    $ionicTabsDelegate.$getByHandle("bottomTab").select(1,false);
    $scope.setEvents(2);
  },400);
  $scope.data ={
    choice:'A'
  };

  $scope.toggleLeft = buildToggler('left');

  // buildToggler is for create menu toggle.
  // Parameter :
  // navID = id of navigation bar.
  function buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function () {
          $mdSidenav(navID).toggle();
      }, 0);
      return debounceFn;
  };

  $scope.radioEventType = [
    {
      name : "Yazar Kadrosu Etkinliği",
      value : "2"
    },
    {
      name : "Kolektif Kitap Etkinliği",
      value :"1"
    },
    {
      name:"Yazı Gönderme Etkinliği",
      value:"3"
    },
    {
      name:"Tüm Etkinlik Türleri",
      value:""
    }
   ];

  $scope.orderProperty = "createdate";

  $scope.activeEvent = [];
  var _userid = $rootScope.globals.id;

      ManageActivityService.getActivity().then(function(events) {
        console.log(events);
          angular.forEach(events, function(event) {
            console.log(event);
            if (event.isActive == 1) {
              var decideToTime;
              var sendStoryButton = true;
              var writerEventApplyButton = false;
              var text1;
              var text2;
              var date = new Date();
              var today = parseInt(date.getTime() / 1000);
              var type;

              if (((event.startDate / 1000) - today) >= 0) {

                text1 = "Başvuruların başlamasına ";
                text2 = " kaldı";
                sendStoryButton = false;
                decideToTime = (event.startDate / 1000) - (today);
              } else {
                console.log("Başladı");
                  text1 = "Başvurunun kapanmasına ";
                  text2 = " kaldı";
                  decideToTime = ((event.endDate / 1000) - today);
                  if (event.type == 2 || event.type == 3) {
                    sendStoryButton = false;
                    writerEventApplyButton = true;
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
                startDate:event.startDate,
                createDate: event.createDate,
                type:type(),
                eventType:event.type,
                decideToTime: decideToTime,
                sendStoryButton: sendStoryButton,
                writerEventApplyButton: writerEventApplyButton,
                text1: text1,
                text2: text2
              });
            }
          });
        }, function(err) {
          console.log(err);
        });
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    console.log($scope.data.choice)
  });

  $scope.typeChanged = function(item){
    console.log(item.value);
    setEventFilterProperty(item.value);
    console.log($rootScope.eventFilterProperty);
    $scope.modal.hide();
  }


    $scope.setEvents=function(id){
      if(id == 1){
        $ionicTabsDelegate.$getByHandle('topTab').select(1,true);
      }else if(id == 2){
        $ionicTabsDelegate.$getByHandle('topTab').select(0,true);
      }
  		console.log($rootScope.filterProperty);
  		setFilterProperty(id);
  	}

    $scope.applyForWriterEvent = function(eventID) {
      UserEventService.createApplyWriterEvent(eventID, _userid).then(function(data) {
        console.log(data);
      }, function(err) {
        console.log(err);
      })
    }

  function setFilterProperty(id){
    $rootScope.filterProperty = "";
    $rootScope.filterProperty=id;
  }

  function setEventFilterProperty(id){
    $rootScope.eventFilterProperty = "";
    $rootScope.eventFilterProperty = id;
  }



  });
