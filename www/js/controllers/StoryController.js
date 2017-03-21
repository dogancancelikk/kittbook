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


.controller('StoryController',function($state,$ImageCacheFactory,$mdUtil,$mdSidenav,$ionicNavBarDelegate,$ionicScrollDelegate,$ionicHistory,
  $ionicSlideBoxDelegate,$scope,CategoryService,USER_DATA,$ionicLoading, $stateParams, $timeout,StoryService,UserService,$rootScope,$ionicTabsDelegate){

    $ionicLoading.show({
	  content: 'Loading',
	  animation: 'fade-in',
	  showBackdrop: true,
	  maxWidth: 200,
	  showDelay: 0
	});

  $scope.$on('$ionicView.enter', function(e) {
    $ionicNavBarDelegate.showBar(true);
});
  // $ionicHistory.clearHistory();
  // $ionicHistory.clearCache().then(function(){console.log("cache gitti");
  // });

    $scope.$parent.clearFabs();

    var count = 0;
    $scope.latestStory = true;

    // $timeout(function() {
    //     $scope.$parent.hideHeader();
    // }, 0);
    $scope.$parent.hideHeader();
	  //  $timeout(function() {
    //    ionicMaterialMotion.blinds();
    // }, 400);
	var images = [];
	$scope.stories=[];
	$scope.categories=[];
	$scope.orderProperty = "createDate";

	StoryService.getStoryWithPagination(1,0).then(function(data){
		$scope.stories=data.newStories;
		for(var i=0; i<data.newStories.length;i++){
			images.push(data.newStories[i].image);
		}
        $ImageCacheFactory.Cache(images).then(function(){
          console.log("cachelendi");
        });$ionicLoading.hide();
	},function(err){
		console.log(err);
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

	$scope.doRefresh = function(){
		if($ionicTabsDelegate.selectedIndex() === 0){
			StoryService.getStoryWithPagination(1,0).then(function(data){
				$scope.stories=data.newStories;
				for(var i=0; i<data.newStories.length;i++){
					images.push(data.newStories[i].image);
				}
		        $ImageCacheFactory.Cache(images).then(function(){
		         console.log("cachelendi");
		        });
		        $ionicLoading.hide();
				console.log($scope.stories);
				$scope.$broadcast('scroll.refreshComplete');
			},function(err){
				console.log(err);
			});
		}else if($ionicTabsDelegate.selectedIndex() === 1){
			StoryService.getStoryWithPagination(2,0).then(function(data){
				$scope.stories=data.mostRatedStories;
				for(var i=0; i<data.mostRatedStories.length;i++){
					images.push(data.mostRatedStories[i].image);
				}
		        $ImageCacheFactory.Cache(images).then(function(){
		          	console.log("cachelendi");
		        });
		        $ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			},function(err){
				console.log(err);
			});
		}
	}
	$scope.loadMoreStories = function(){
	    count = count + 1;
		if($ionicTabsDelegate.selectedIndex() === 0){
			StoryService.getStoryWithPagination(1,count).then(function(data){
				if(data.newStories.length >= 0){
					angular.forEach(data.newStories, function(newStory){
						$scope.stories.push(newStory);
					});
				for(var i=0; i<data.newStories.length;i++){
					images.push(data.newStories[i].image);
				}
		        $ImageCacheFactory.Cache(images).then(function(){
		          console.log("cachelendi");
		        });
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}else{
					$scope.latestStory = false;
					$scope.$apply(function(){
					    $scope.$broadcast('scroll.infiniteScrollComplete');
					});
				}
			},function(err){
				console.log(err);
			});
		}else if($ionicTabsDelegate.selectedIndex() === 1){
			StoryService.getStoryWithPagination(2,count).then(function(data){
				if(data.mostRatedStories.length >= 0){
					angular.forEach(data.mostRatedStories, function(newStory){
						$scope.stories.push(newStory);
					});
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}else{
					$scope.latestStory = false;
					$scope.$apply(function(){
					    $scope.$broadcast('scroll.infiniteScrollComplete');
					});
				}
			},function(err){
				console.log(err);
			});
		}
	}

    $scope.reportSlideChanged = function(slideNum) {
     setFilterProperty(slideNum);
    }

  	$scope.getNewStories = function(){

  		$ionicScrollDelegate.scrollTop();
  		$ionicLoading.show({
  		  content: 'Loading',
  		  animation: 'fade-in',
  		  showBackdrop: true,
  		  maxWidth: 200,
  		  showDelay: 0
  		});
  		StoryService.getStoryWithPagination(1,0).then(function(newStories){
  			$scope.stories=[];
  			$scope.stories=newStories.newStories;
  			$ionicLoading.hide();
  			$ionicTabsDelegate.select(0,false);
  		})
  	}

  	$scope.getMostRated = function(){
  		$ionicScrollDelegate.scrollTop();
  		$ionicLoading.show({
  		  content: 'Loading',
  		  animation: 'fade-in',
  		  showBackdrop: true,
  		  maxWidth: 200,
  		  showDelay: 0
  		});
  		StoryService.getStoryWithPagination(2,0).then(function(mostRatedStories){
  			$scope.stories = [];
  			$scope.stories = mostRatedStories.mostRatedStories;
  			$ionicLoading.hide();
  			$ionicTabsDelegate.select(1,false);

  		});
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

	function setFilterProperty(id){
		$rootScope.filterProperty = "";
		$rootScope.filterProperty=id;
	}

	$scope.setOrderProperty=function(id){
		console.log(id);
		if(id =='createDate'){
			$ionicTabsDelegate.select(0,false);
		}else if(id == 'storyrate'){
			$ionicTabsDelegate.$getByHandle('myTabs').select(1,false);
		}
		$rootScope.filterProperty = "";
		$scope.orderProperty = id;
	}
});
