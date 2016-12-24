'use strict';
angular
.module('starter')
.controller('FollowedUsersController',function($scope,$stateParams,$timeout,ionicMaterialInk,$ionicLoading,ionicMaterialMotion,RelationshipService,USER_DATA)
{

  $ionicLoading.show({
  content: 'Loading',
  animation: 'fade-in',
  showBackdrop: true,
  maxWidth: 200,
  showDelay: 0
});
	//Begin
	    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
  	$scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
	  ionicMaterialInk.displayEffect();
	   $timeout(function() {
       ionicMaterialMotion.blinds();
    }, 400);

	
    //Begin
    $scope.followedUsers=[];
    
	var userid=$stateParams.userid;


	getFollowedUsers();
	function getFollowedUsers(){
		RelationshipService.getFollowedUsers(userid).then(function(followedUsers){
			 $scope.followedUsers=followedUsers;
       $ionicLoading.hide();
		 },function(err){
			 console.log(err);
		 })
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
