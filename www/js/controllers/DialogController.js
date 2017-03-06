'use strict';
angular.module('starter')
.controller('DialogController',function($scope, $mdDialog, displayOption){
  $scope.displayOption = displayOption;

  $scope.cancel = function () {
      $mdDialog.cancel(); //close dialog.
  };

  $scope.ok = function () {
      $mdDialog.hide();//hide dialog.
  };
})
