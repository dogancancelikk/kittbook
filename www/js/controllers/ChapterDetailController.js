'use strict';
angular
.module('starter')
.controller('ChapterDetailController',function($scope,$rootScope,$ionicHistory,ChapterService,$stateParams,$state,ionicMaterialInk,$timeout,$ionicPopup,StoryService){
  $scope.$parent.showHeader();
	$scope.$parent.clearFabs();
	$scope.isExpanded = false;
	$scope.$parent.setExpanded(false);
	$scope.$parent.setHeaderFab(false);
  $scope.otherchapter = false;

  var chapterid=$stateParams.chapterid;
	var _userid=$rootScope.globals.currentUser.id;

	ChapterService.readChapter(chapterid, _userid);

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
    isThereAnotherChapter($scope.chapter.chapterNumber+1, $scope.chapter.storyID);
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
  function isThereAnotherChapter(chapternumber,storyid){

    ChapterService.getChapterWithChapterNumber(chapternumber, storyid).then(function(chapterData){

        if(chapterData === null || chapterData === ""){
          $scope.otherchapter = false;
        }else{
          $scope.otherchapter = true;
        }
    });
  }
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
