'use strict';
angular.module('starter')
.service('ChapterService',function($http,$q,domainConstant){
  return({
    getStoryChapter:getStoryChapter,
    addStoryChapter:addStoryChapter,
    getChapter:getChapter,
    getChapterWithChapterNumber:getChapterWithChapterNumber
  });

  function getChapterWithChapterNumber(chapterNumber,storyID){
    var request = $http({
      method:'GET',
      url:domainConstant.chapterApi+"/getChapterWithNumber/"+chapterNumber+"," + storyID,
      params:{
        action:'get'
      }
    });
    return(request.then(handleSuccess,handleError));
  }

  function addStoryChapter(name,storyID, userID, text,chapterNumber) {

      var request = $http({
          method: "post",
          url: domainConstant.chapterApi + "/create",
          headers: {"Content-Type":"application/json"},
          params: {
              action: "add"
          },
          data: {
              status: 1,
              name: name,
              chapterstatus: "B",
              storyID: storyID,
              userID: userID,
              text: text,
              image:'http://bianet.org/system/uploads/1/articles/spot_image/000/170/050/original/bayrak.jpg',
              chapterNumber:chapterNumber
          }
      });
      return( request.then( handleSuccess, handleError ) );
  }

  function getStoryChapter(storyId,unpublished){
    var request=$http({
      method:'GET',
      url:domainConstant.chapterApi+"/getstorychapters/"+storyId+"," + unpublished,
      params:{
        action:'get'
      }
    });
    return(request.then(handleSuccess,handleError));
  }


  function getChapter(chapterId){
    var request=$http({
      method:'GET',
      url:domainConstant.chapterApi+"/get/"+chapterId,
      params:{
        action:'get'
      }
    });
    return(request.then(handleSuccess,handleError));
  }



  function handleSuccess(response){
    return (response.data);
  }

  function handleError(response){
    if (!angular.isObject( response.data ) ||(! response.data.message)) {
              return( $q.reject( "An unknown error occurred." ));
    }
  }


});
