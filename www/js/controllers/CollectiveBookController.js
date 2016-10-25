'use strict';

angular
.module('starter')
.controller('CollectiveBookController',function($scope, CollectiveBookService,$timeout,$ionicTabsDelegate){
  $scope.$parent.clearFabs();
  $timeout(function() {
      $scope.$parent.hideHeader();
  }, 0);

    $scope.collectivebooks=[];
    $scope.orderProperty = "createdate";

      getCollectiveBookWithStatusProperty("/getStarted");

    $scope.setStatusProperty = function(id){
      $scope.collectivebooks=[];
      if(id == 1){
        $ionicTabsDelegate.select(0);
        getCollectiveBookWithStatusProperty("/getStarted");
      }else if (id == 2) {
        $ionicTabsDelegate.select(1);
        getCollectiveBookWithStatusProperty("/getNotStarted");
      }else if (id == 3) {
        $ionicTabsDelegate.select(2);
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
