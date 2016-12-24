'use strict';
angular
.module('starter')
.controller('FollowersController',function($scope,$stateParams,$timeout,ionicMaterialInk,$ionicLoading,ionicMaterialMotion,RelationshipService,USER_DATA)
{

  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});
	//Begin
	// Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
	  $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
	  ionicMaterialInk.displayEffect();
	   $timeout(function() {
       ionicMaterialMotion.blinds();
    }, 400);

	var userid=$stateParams.userid;
	$scope.followers=[];
	getFollowers();


	function getFollowers(){
		RelationshipService.getFollowers(userid).then(function(followers){
			$scope.followers=followers;
			
      $ionicLoading.hide();

	// 		ionicMaterialInk.displayEffect();
		},function(err){
			console.log(err);
		});
	}


})
.directive('ngLastRepeat', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngLastRepeat'+ (attr.ngLastRepeat ? '.'+attr.ngLastRepeat : ''));
                });
            }
        }
    }
});
