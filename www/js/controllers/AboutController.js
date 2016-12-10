'use strict';

angular.module("starter")
.controller("AboutController", function($scope,$state,UserService,$stateParams){
		var userid=$stateParams.userid;
		
		UserService.getUserDetail(userid).then(function(userdata){
			$scope.user=userdata;
		},function(err){
			console.log(err);
		});
	
});
