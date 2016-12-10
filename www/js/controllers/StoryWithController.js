angular.module('starter')
.controller('StoryWithCategories',function($scope,StoryService){

    StoryService.getStory().then(function(data){
      console.log(data);
    });

});
