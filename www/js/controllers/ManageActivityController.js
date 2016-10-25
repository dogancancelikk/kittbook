'use strict';

angular.module('starter')
.controller('ManageActivityController',function($scope,ionicMaterialInk,ManageActivityService){

	//Ionic Material pieces
	//begin
	$scope.$parent.showHeader();
	$scope.$parent.clearFabs();
	$scope.isExpanded = true;
	$scope.$parent.setExpanded(true);
	$scope.$parent.setHeaderFab(false);


	ionicMaterialInk.displayEffect();

	// ionicMaterialMotion.pushDown({
	// 		selector: '.push-down'
	// });
	// ionicMaterialMotion.fadeSlideInRight({
	// 		selector: '.animate-fade-slide-in .item'
	// });
	//end
// 	$scope.activeEvent=[];
// 	$scope.oldEvent=[];
// 	if(document.getElementById("devam").selected==true){
// 		ManageActivityService.getActivityWithId().then(function(events){
// 			angular.forEach(events,function(event){
// 				console.log(event);
// 				if(event.isActive==1){
// 					$scope.activeEvent.push(event);
// 				}
// 				else{
// 					$scope.oldEvent.push(event);
// 				}
// 			})
// 			console.log($scope.activeEvent);
// 		},function(err){
// 			console.log(err);
// 		})
// 	}
	$scope.activeEvents=[];
	$scope.passiveEvents=[];
// 	for(var id=0; id<20; id++ ){
// 	ManageActivityService.getActivityWithId(id).then(function(event){
// 		if(event.isActive==1){
// 			$scope.activeEvents.push(event);
// 		}
// 	  else{
// 			$scope.passiveEvents.push(event);
// 		}

// 	})
// 	}
	debugger;
	ManageActivityService.getActivity().then(function(events){
		angular.forEach(events,function(event){
				if(event.isActive==1){
					$scope.activeEvents.push(event);
				}
				else{
					$scope.passiveEvents.push(event);
				}
		})
	});



});
