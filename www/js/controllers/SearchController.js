'use strict';
angular
  .module('starter')
  .controller('SearchController',function($scope,SearchService,ionicMaterialInk,$timeout){
             $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
          
        $scope.$watch('search',function(searchText){
          SearchService.search(searchText).then(function(data){
            $scope.searchResults=data;
            console.log($scope.searchResults);

          },function(err){
            console.log(err);
          });
        });
  });