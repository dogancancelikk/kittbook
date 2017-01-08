'use strict';
angular
  .module('starter')
  .controller('SearchController',function($scope,SearchService,ionicMaterialInk,$timeout,$ionicLoading){
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
       $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.nullSearchResult =true;
 
    ionicMaterialInk.displayEffect();
          
        $scope.$watch('search',function(searchText){
          if(searchText !== null || searchText !== undefined){
          $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
          SearchService.search(searchText).then(function(data){
            $scope.searchResults=data;
            $scope.nullSearchResult =false;
            $ionicLoading.hide()
          },function(err){
            $scope.searchResults = {};
            $ionicLoading.hide();
            $scope.nullSearchResult =true;
            console.log(err);
          });
          }
      
        });
  });""