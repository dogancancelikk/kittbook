'use strict';
angular.module('starter')
.controller('AllChatsController',function($scope,ChatService,$mdSidenav,$timeout,ionicMaterialInk,$mdUtil,ionicMaterialMotion,$rootScope,$ionicLoading){

  // $scope.$parent.showHeader();
  // $scope.$parent.clearFabs();
  // $scope.isExpanded = false;
  // $scope.$parent.setExpanded(false);
  // $scope.$parent.setHeaderFab(false);
  // ionicMaterialInk.displayEffect();
  $scope.$parent.clearFabs();
  $scope.$parent.hideHeader();
  ionicMaterialInk.displayEffect();

  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});
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

  var _userid=$rootScope.globals.id;
  ChatService.getAllMessages(_userid).then(function(data){
    $scope.messages=data;
    $ionicLoading.hide();
  },function(err){
    console.log(err);
  });

})
