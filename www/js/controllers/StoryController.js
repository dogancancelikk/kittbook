'use strict';

angular.module('starter')
  .filter('categoryFilter', function() {
    
    return function(items, search) {
    	
        if (!search) {
            return items;
        }

        var category = search;
        if (!category || '' === category) {

            return items;
        }

        return items.filter(function(element, index, array) {
            return element.categoryID === category;
        });

    };
})
.controller('StoryController',function($state,$ionicSlideBoxDelegate,$scope,CategoryService,USER_DATA, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, StoryService,UserService,$rootScope){
	//Ionic Material pieces
	//begin
// 	$scope.$parent.showHeader();
// 	$scope.$parent.clearFabs();
// 	$scope.isExpanded = false;
// 	$scope.$parent.setExpanded(false);
// 	$scope.$parent.setHeaderFab(false);
	
	// ionicMaterialInk.displayEffect();
	// ionicMaterialMotion.ripple();
// 	ionicMaterialMotion.pushDown({
// 			selector: '.push-down'
// 	});
// 	ionicMaterialMotion.fadeSlideInRight({
// 			selector: '.animate-fade-slide-in .item'
// 	});
	//end
	  $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
	  ionicMaterialInk.displayEffect();
	   $timeout(function() {
       ionicMaterialMotion.blinds();
    }, 400);
   

	$scope.stories=[];
	$scope.categories=[];
	$scope.orderProperty = "createdate";
	

// 	$rootScope.activeCategory=0;

// 	$scope.$watch('activeCategory',function(newValue){
// 		setFilterProperty(newValue);
// 	})
	


	StoryService.getStory().then(function(data){
		$scope.stories=data;
		
	},function(err){
		console.log(err);
	})
  
  $scope.reportSlideChanged = function(slideNum) {
    setFilterProperty(slideNum);
  }


	CategoryService.getCategories().then(function(data){
			$scope.categories=data;
			$ionicSlideBoxDelegate.update();
		},function(Err){
			console.log(Err);
		});

	
	$scope.setCategory=function(id){		
		console.log($scope.filterProperty);
		$rootScope.activeCategory=id-1;
		setFilterProperty(id);
		$state.go('app.storywithcategories');
	}

// 	function getStories(){
// 		StoryService.getStory().then(function(usersAllStory){
// 				var storyOwnersUser;
// 					angular.forEach(usersAllStory, function(userStory,key) {
// 						UserService.getUserDetail(userStory.ownerID).then(function(data){

// 							storyOwnersUser=data.name+ " "+ data.surname;
// 							$scope.stories.push({
// 								name:userStory.name,
// 								createdate:userStory.createdate,
// 								image:userStory.image,
// 								storyOwnersUser:storyOwnersUser,
// 								id:userStory.id,
// 								writerImage:data.image,
// 								userid:data.id,
// 								storyrate:parseInt(userStory.storyrate),
// 								category:userStory.categoryID,
// 								description:userStory.description,
// 								readcount:userStory.readcount
// 							});
// 						});
// 			});
// 		},function(error){
// 			console.log("Services error"+error);
// 		});	
// 	}
	// function getCategories(){	
	// CategoryService.getCategories().then(function(data){
	// 		$scope.categories=data;			
	// 	},function(Err){
	// 		console.log(Err);
	// 	});
	// }
	// $scope.$watch("categoryModel", function (category) {		
	// 		var categoryId=category.id;
	// 		console.log(categoryId);
	// 		setFilterProperty(categoryId);
	// 		setOrderProperty(categoryId);		
	// 	});
	function setFilterProperty(id){
		$rootScope.filterProperty = "";
		$rootScope.filterProperty=id;
	}
	$scope.setOrderProperty=function(id){
		$rootScope.filterProperty = "";
		$scope.orderProperty = id;
	}	
});
