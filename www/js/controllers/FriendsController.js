'use strict';
angular
.module('starter')
.controller('FriendsController',function($scope,$stateParams,$timeout,ionicMaterialInk,$ionicLoading,ionicMaterialMotion,RelationshipService,USER_DATA)
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
//     $scope.$parent.setHeaderFab('left');
	$scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    // Delay expansion
//     $timeout(function() {
//         $scope.isExpanded = false;
//         $scope.$parent.setExpanded(false);
//     }, 300);

    // Set Motion
	  ionicMaterialInk.displayEffect();
	   $timeout(function() {
       ionicMaterialMotion.blinds();
    }, 400);

		// Set Ink
// 		$scope.$on('ngLastRepeat.mylist',function(e) {
// 			 ionicMaterialInk.displayEffect();
// 		});

    //End
    //Begin
    $scope.followedUsers=[];
    $scope.followers=[];
	var userid=$stateParams.userid;
	$scope.followers=[];
	getFollowers();
	getFollowedUsers();


	function getFollowers(){
		RelationshipService.getFollowers(userid).then(function(followers){
			$scope.followers=followers;
			
      $ionicLoading.hide();

	// 		ionicMaterialInk.displayEffect();
		},function(err){
			console.log(err);
		});
	}

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
