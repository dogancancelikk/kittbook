'use strict';
angular
.module('starter')
.controller('NewCollectiveBookController',function(ionicMaterialInk,$scope,StoryService,$rootScope,$ionicPopup,$state){
    //Ionic Material pieces
  //begin
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab(false);


  ionicMaterialInk.displayEffect();
  //end

  var _userid=$rootScope.globals.currentUser.id;

  $scope.data={};
  $scope.createCollectiveBook=function(data){

    debugger;
    StoryService.addStory(data.name,_userid,data.about,1).then(function(data){
      console.log(data);
      var alertPopup=$ionicPopup.alert({
       title: 'Kolektif Kitap Oluşturma',
       template: 'Kolektif kitap başarı ile oluşturuldu...'
     });
     alertPopup.then(function(res) {
        $state.go('app.collectivebook',{});
        console.log(data);
      });

    },function(err){
      console.log(err);
    })
  }

});
