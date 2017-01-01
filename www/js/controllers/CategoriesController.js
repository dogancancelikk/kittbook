'use strict';

angular.module('starter')
.controller('CategoriesController',function($scope,CategoryService,$state,$ionicLoading,$ionicSlideBoxDelegate,$timeout,ionicMaterialInk,$rootScope,ionicMaterialMotion){
  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});

  $scope.setCategory=function(id){
    console.log($scope.filterProperty);
    $rootScope.activeCategory=id-1;
    setFilterProperty(id);
    $state.go('app.storywithcategories');
  }
  function setFilterProperty(id){
    $rootScope.filterProperty = "";
    $rootScope.filterProperty=id;
  }
  $scope.categories=[];
    CategoryService.getCategories().then(function(data){

      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab(false);
      
      ionicMaterialInk.displayEffect();
       $timeout(function() {
         ionicMaterialMotion.blinds();
      }, 400);

        $scope.categories=data;
        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide();
      },function(Err){
        console.log(Err);
      });
  })
