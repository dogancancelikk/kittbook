'use strict';

angular
.module('starter')
.controller('AnnouncementController',function($scope,ionicMaterialInk,ManageActivityService,$state,$timeout,CollectiveBookService){
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
	$scope.visibilityofbox=false;
	$scope.data={};
	$scope.createActivity=function(){
	//	console.log(document.getElementById("bitisTarihi").value);
		var startDate=document.getElementById("basvuruAcilacakTarih").value;
		var applyStartDate=new Date(startDate);
		var applyStartSecond=(applyStartDate.getTime()/1000);

		var endDate=document.getElementById("basvuruBitisTarihi").value;
		var applyEndDate=new Date(endDate);
		var applyEndSecond=(applyEndDate.getTime())/1000;
		var remainSecond= (applyEndSecond-applyStartSecond)/60/60;

		ManageActivityService.addActivity($scope.data.name,$scope.data.text,applyStartDate,applyEndDate,
																			$scope.data.type,$scope.data.collectivebookID).then(function(data){
			console.log(data);
      $state.go('app.userevent',{});
		},function(err){
			console.log(err);
		});
  }

	$scope.$watch("data.type", function (newValue) {
			if(newValue=="1"||newValue=="2"){
				$timeout(function(){
					$scope.visibilityofbox=true;
				},1000);

			}
		  else{
				$scope.visibilityofbox=false;
			}
		});

	$scope.collectivebooks=[];
	CollectiveBookService.getCollectiveBookWithStatus().then(function(collectivebooks){
      angular.forEach(collectivebooks,function(data){
        $scope.collectivebooks.push({
          id:data.id,
          name:data.name
        });
      })
    },function(err){
      console.log(err);
    })


});
