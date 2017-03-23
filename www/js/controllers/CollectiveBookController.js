'use strict';

angular
.module('starter')
.controller('CollectiveBookController',function($scope, CollectiveBookService,$timeout,$ionicTabsDelegate,$mdUtil,$mdSidenav){
  $scope.$parent.clearFabs();
  $timeout(function() {
      $scope.$parent.hideHeader();
  }, 0);

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

    $scope.collectivebooks=[];
    $scope.orderProperty = "createdate";

      getCollectiveBookWithStatusProperty("/getStarted");

    $scope.setStatusProperty = function(id){
      $scope.collectivebooks=[];
      if(id == 1){
        $ionicTabsDelegate.$getByHandle('collectiveTabs').select(0,false);
        getCollectiveBookWithStatusProperty("/getStarted");
      }else if (id == 2) {
        $ionicTabsDelegate.$getByHandle('collectiveTabs').select(1,false);
        getCollectiveBookWithStatusProperty("/getNotStarted");
      }else if (id == 3) {
        $ionicTabsDelegate.$getByHandle('collectiveTabs').select(2,false);
        getCollectiveBookWithStatusProperty("/getFinished");
      }
    }

    function getCollectiveBookWithStatusProperty(status){
      CollectiveBookService.getCollectiveBookWithStatus(status).then(function(collectivebooks){
        angular.forEach(collectivebooks,function(data){
          $scope.collectivebooks.push({
            id:data.id,
            name:data.name,
            image:data.image,
            createdate:(data.createdate),
            description:data.description
          })
        })
      },function(err){
        console.log(err);
      });
    }



})
