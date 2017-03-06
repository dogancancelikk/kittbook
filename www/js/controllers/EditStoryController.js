angular.module('starter')
.controller('EditStoryController',function($scope,$ionicLoading,StoryService,$state,ionicMaterialInk,$stateParams,$timeout,CategoryService){
  $scope.$parent.showHeader();
	$scope.$parent.clearFabs();
	$scope.isExpanded = false;
	$scope.$parent.setExpanded(false);
	$scope.$parent.setHeaderFab(false);
	ionicMaterialInk.displayEffect();
  
  $scope.modifiedstory = {};
  $scope.modifiedstory.category = {};
  var storyid = $stateParams.storyid;
  $scope.categories = [];


  StoryService.getStoryWithID(storyid).then(function(story){
    console.log(story);
    $scope.story = story;
    delete $scope.story.categories;
    delete $scope.story.authors;
    console.log($scope.story);

    CategoryService.getCategories().then(function(categories){
      console.log(categories);
      $scope.categories = categories;
      },function(Err){
        console.log(Err);
      });
  })

  $scope.updateStory = function(story){
    $ionicLoading.show({
  		content: 'Loading',
  		animation: 'fade-in',
  		showBackdrop: true,
  		maxWidth: 200,
  		showDelay: 0
  	});
  StoryService.updateStory(story).then(function(data){
    $ionicLoading.hide();
    $state.go('app.managestory', {storyid:data.id});
  })

  }

})
