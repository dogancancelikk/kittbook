'use strict';
angular.module('starter')
.controller('ManageStoryController',function($scope,$ionicLoading,$stateParams,StoryService,ChapterService,ionicMaterialInk,ionicMaterialMotion,$timeout,CategoryService){
	$scope.$parent.showHeader();
	$scope.$parent.clearFabs();
	$scope.isExpanded = false;
	$scope.$parent.setExpanded(false);
	$scope.$parent.setHeaderFab(false);
	ionicMaterialInk.displayEffect();
	$scope.group={};
	$scope.group.show=false;

    $ionicLoading.show({
	  content: 'Loading',
	  animation: 'fade-in',
	  showBackdrop: true,
	  maxWidth: 200,
	  showDelay: 0
	});

	$scope.storyid = $stateParams.storyid;
	$scope.story = {};
	StoryService.getStoryWithID($scope.storyid).then(function(data){
		console.log(data);
		$scope.story = data;
		CategoryService.getOneCategory(data.categoryID).then(function(category){
			console.log(category);
			$scope.categoryname = category.name;
		})
		$ionicLoading.hide();
	});
	$scope.chapters=[];
	ChapterService.getStoryChapter($scope.storyid,true).then(function(chapters){
		$scope.length = chapters.length;
		angular.forEach(chapters,function(chapter){
			$scope.chapters.push({
				name:chapter.name,
				text:chapter.text,
				id:chapter.id
			})
		});
	});
	$scope.toggleGroup = function(group) {
		group.show = !group.show;
	};
	$scope.isGroupShown = function(group) {
		return group.show;
	};
	$scope.publish = function(id){
		$ionicLoading.show({
		  content: 'Loading',
		  animation: 'fade-in',
		  showBackdrop: true,
		  maxWidth: 200,
		  showDelay: 0
		});
		StoryService.publishStory(id).then(function(data){
			$scope.story = {};
			$scope.story = data;
			$ionicLoading.hide();
		})
	}
	$scope.withdraw = function(id){
		$ionicLoading.show({
		  content: 'Loading',
		  animation: 'fade-in',
		  showBackdrop: true,
		  maxWidth: 200,
		  showDelay: 0
		});
		StoryService.withdrawStory(id).then(function(data){
			console.log(data);
			$scope.story = {};
			$scope.story = data;
			$ionicLoading.hide();
		})
	}

});
