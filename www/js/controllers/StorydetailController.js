'use strict';
angular.module('starter')
.controller('StorydetailController', function($rootScope,$scope,$stateParams,
    StoryService,$ionicModal,$timeout,ionicMaterialMotion,ionicMaterialInk,$state,AuthService,ChapterService,
    $ionicSlideBoxDelegate,$ionicScrollDelegate, LibraryService) {
  //Begin 
  // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    //End
  
  //Parallax Theme
    
  $ionicSlideBoxDelegate.update();
  $scope.onUserDetailContentScroll = onUserDetailContentScroll


   function onUserDetailContentScroll(){
    var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
    var scrollView = scrollDelegate.getScrollView();
    $scope.$broadcast('userDetailContent.scroll', scrollView);
  }
  //Parallax End

   $scope.storyid=$stateParams.storyid;
   var userid=$rootScope.globals.currentUser.id;
   var libraryid = $rootScope.globals.currentUser.libraryid;
   console.log(libraryid);
    $scope.alreadyHave=false;
    $scope.isOwnStory = false;  

  
  $scope.deleteStoryFromLibrary = function(){
    LibraryService.deleteStoryFromLibrary(libraryid,$scope.storyid).then(function(data){
      console.log(data);
      $scope.alreadyHave=false;
    },function(err){
      console.log(err);
    })
  }
  
    $scope.addToLibrary = function() {
      LibraryService.addStoryToLibrary(libraryid, $scope.storyid).then(function(data) {
        console.log(data);
          $scope.alreadyHave = true;
      },function(err){
        console.log(err);
      });
    }
    
    StoryService.getStoryWithID($stateParams.storyid).then(function(data){
      $scope.story=data;
      $scope.storyid=data.id;      
      if($rootScope.globals.currentUser.id == data.ownerID){
        $scope.isOwnStory = true;
      }else{            
        LibraryService.hasStory(libraryid,$scope.storyid).then(function(data){
            console.log(data);
            if(data==true){
              $scope.alreadyHave=true;
            }else{
              $scope.alreadyHave=false;
            }
          },function(err){
            console.log(err);
          });
      }
      
      
    },function(err){
        console.log(err);
    });

    $scope.deneme=function(){
      console.log("dene dene dene");
    }

    $scope.chapters=[];
    ChapterService.getStoryChapter($scope.storyid,true).then(function(chapters){
      angular.forEach(chapters,function(chapter){
        $scope.chapters.push({
          name:chapter.name,
          text:chapter.text,
          image:chapter.image,
          id:chapter.id
        })
      });

    });
 

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.createChapter=function(chapterName){
      ChapterService.addStoryChapter(1,chapterName,'B',$stateParams.storyid,userid,'bu bir texttir.')
      .then(function(data){
        console.log(data);
      });
      $scope.modal.hide();
    }

    // var addChapter=[];
    // $scope.createChapter = function(newChapterParameter) {
    //   addChapter.push({
    //     status:1,
    //     name: newChapterParameter.chapterName,
    //     chapterstatus:'B',
    //     storyID:1,
    //     userID:USER_DATA.userid,
    //     text:"asdasd"
    //
    //   });
    //   console.log(addChapter);
    //
    //   ChapterService.addStoryChapter(
    //     addChapter.status,
    //     addChapter.name,
    //     addChapter.chapterstatus,
    //     addChapter.storyID,
    //     addChapter.userID,
    //     addChapter.text
    //
    //   ).then(function(data){
    //     console.log("eklendiyse burada değer vardır:"+data);
    //   });
    //   $scope.modal.hide();
    // };


})

