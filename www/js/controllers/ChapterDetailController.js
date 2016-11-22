'use strict';
angular
.module('starter')
.controller('ChapterDetailController',function($scope,$rootScope,ChapterService,$stateParams,$state,ionicMaterialInk,ionicMaterialMotion,$timeout,$ionicPopup,StoryService){
  $scope.$parent.showHeader();
	$scope.$parent.clearFabs();
	$scope.isExpanded = false;
	$scope.$parent.setExpanded(false);
	$scope.$parent.setHeaderFab(false);
	ionicMaterialInk.displayEffect();
	ionicMaterialMotion.ripple();
     $timeout(function() {
     ionicMaterialMotion.slideUp({
       selector: '.slide-up'
     });
   }, 300);
// 	ionicMaterialMotion.pushDown({
// 			selector: '.push-down'
// 	});
// 	ionicMaterialMotion.fadeSlideInRight({
// 			selector: '.animate-fade-slide-in .item'
// 	});
	//end
  var chapterid=$stateParams.chapterid;
	var _userid=$rootScope.globals.currentUser.id;

  $scope.goOtherChapter = function(chapter){
    var chapterNumber = chapter.chapterNumber+1;
    console.log(chapterNumber);
    ChapterService.getChapterWithChapterNumber(chapterNumber, chapter.storyID).then(function(chapterData){
      console.log(chapterData);
      $state.go('app.chapterdetail',{chapterid:chapterData.id});
    });
  }


  ChapterService.getChapter(chapterid).then(function(data){
		$scope.chapter=data;
    console.log(data);
		var storyid = data.storyID;
		StoryService.getStoryWithID(storyid).then(function(storyData){
			$scope.storyname=storyData.name;
		},function(err){
			console.log(err);
		});

  },function(err){
    console.log(err);
  });

	$scope.showPopup = function() {
      $scope.data = {}

      // Custom popup
      var myPopup = $ionicPopup.show({
         template: ' <ionic-ratings ratingsobj="ratingsObject" index="$index"></ionic-ratings>',
         title: 'Hikayeye Puan Ver',
         scope: $scope,
				 buttons: [
            { text: 'İptal Et' }, {
               text: '<b>Puanla</b>',
               type: 'button-positive',
                  onTap: function(e) {
										if($scope.ratingsObject.rating == 0){
											return null;
										}else{
											console.log($scope.ratingsObject.rating)
											return $scope.ratingsObject.rating;
										}

                  }
            }
         ]
      });

      myPopup.then(function(res) {
				StoryService.storyRate($scope.chapter.storyID,_userid,res).then(function(data){
						console.log(data);

					},function(err){
						console.log(err);
					})

			});
   };
	 $scope.myTitle = 'IONIC RATINGS DEMO';

		$scope.ratingsObject = {
			iconOn: 'ion-ios-star', //Optional
			iconOff: 'ion-ios-star-outline', //Optional
			iconOnColor: 'rgb(200, 200, 100)', //Optional
			iconOffColor: 'rgb(200, 100, 100)', //Optional
			rating: 4, //Optional
			minRating: 0, //Optional
			readOnly: false,
			callback: function(rating,index){
				console.log(rating + " " + index);
			}
		};


})
