'use strict';
angular.module('starter')
.controller('CategoriesController',function($ImageCacheFactory,$scope,CategoryService,$state,$ionicLoading,$ionicSlideBoxDelegate,$timeout,ionicMaterialInk,$rootScope,ionicMaterialMotion){
  $scope.categories={};
  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});

  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);
  ionicMaterialInk.displayEffect();
  $timeout(function() {
    ionicMaterialMotion.blinds();
  }, 400);

  $scope.setCategory=function(id){
    console.log($scope.filterProperty);
    $rootScope.activeCategory=id-1;
    setFilterProperty(id);
    $state.go('app.storywithcategories',{categoryid:id});
  }
  function setFilterProperty(id){
    $rootScope.filterProperty = "";
    $rootScope.filterProperty=id;
  }

    CategoryService.getCategories().then(function(data){
        $scope.categories=data;
        $ionicSlideBoxDelegate.update();
        var images = [];
          for(var i=0; i<data.length;i++){
          images.push(data[i].image);
          }
            $ionicLoading.hide();
        $ImageCacheFactory.Cache(images).then(function(){
          console.log("Fotolar cachelendi");
        });
      },function(Err){
        console.log(Err);
      });
  })
