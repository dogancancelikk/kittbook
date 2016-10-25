'use strict';

angular
.module("starter")

.controller('NewStoryController',function($scope,StoryService,ionicMaterialInk,$state,$ionicSlideBoxDelegate){
	  $scope.$parent.clearFabs();
	 ionicMaterialInk.displayEffect();
 		 $scope.data = {};

  //login (AuthService servisi kullanılıyor(services.js))
	var events = ['trixInitialize', 'trixChange', 'trixSelectionChange', 'trixFocus', 'trixBlur', 'trixFileAccept', 'trixAttachmentAdd', 'trixAttachmentRemove'];

	for (var i = 0; i < events.length; i++) {
	    $scope[events[i]] = function(e, editor) {
	        console.info('Event type:', e.type);
	    }
	};
	$scope.trixInitialize = function(e, editor) {

	    // Insert “Hello” at the beginning of the document
	    editor.setSelectedRange([0, 0])
	    editor.insertString("Hello")
	}
  $scope.createStory=function(data){
  	StoryService.addStory(data.name,3,data.description,0).then(function(data){

  		$state.go('app.storydetail',{storyid:data.id});
  	},function(err){
  		console.log("Hata var" + err);
  	})
  }

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
    console.log($scope.data);
  };

});
