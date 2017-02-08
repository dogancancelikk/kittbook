angular.module('starter')

.service('StoryService', function($q,$http,domainConstant) {
    return({

      getUserStory:getUserStory,
      getStory:getStory,
      addStory:addStory,
      getStoryWithID:getStoryWithID,
      storyRate:storyRate,
      getStoryWithPagination:getStoryWithPagination,
      publishStory:publishStory,
      withdrawStory:withdrawStory,
      readStory:readStory,
      updateStory:updateStory,
      getComments:getComments,
      addComment:addComment,
      getUserPublishedStory:getUserPublishedStory,
      getStoryWithCategories:getStoryWithCategories
    })

    function readStory( storyId, userId ) {
        var request = $http({
            method: "post",
            url: domainConstant.storyApi + "/read",
            headers: {"Content-Type":"application/json"},
            data: {
                storyID: storyId,
                userID: userId
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function addComment( userId, storyId, commentText ) {
        var request = $http({
            method: "put",
            url: domainConstant.storyApi + "/comment",
            headers: {"Content-Type":"application/json"},
            params: {
                action: "add"
            },
            data: {
                id: 0,
                userID: userId,
                parentID: storyId,
                text: commentText,
                typeID: 1
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function addStory(story){
      var request=$http({
        method:'POST',
        url:domainConstant.storyApi+'/create',
        headers: {"Content-Type":"application/json"},
        params:{
          action:'add'
        },
        data: {
          id:0,
          name:story.title,
          ownerID:story.ownerID,
          tags:story.tags,
          categoryID:story.category,
          description:story.description,
          isCollective:0,
          isPublished:0
        }
      });
      return (request.then(handleSuccess,handleError));
    }

    function updateStory(story) {
        var request = $http({
            method: "put",
            url: domainConstant.storyApi + "/update",
            headers: {"Content-Type":"application/json"},
            data: JSON.stringify(story)
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function getComments(storyId) {
        var request = $http({
            method: "get",
            url: domainConstant.storyApi + "/getcomments/" + storyId
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function storyRate(storyID,userID,rate){
      var request=$http({
        method:'POST',
        url:domainConstant.storyApi+'/rate',
        headers: {"Content-Type":"application/json"},
        params:{
          action:'add'
        },
        data: {
           storyID: storyID,
           userID: userID,
           rate: rate
        }
      });
      return (request.then(handleSuccess,handleError));
    }

    function getStory(){
      var request=$http({
        method:'GET',
        url:domainConstant.storyApi+"/getAllWithDetails",
        params:{
          action:'get'
        }
      });
      return(request.then(handleSuccess,handleError));
    }
   function getStoryWithCategories(id){
     var request=$http({
        method:'GET',
        url:domainConstant.storyApi+"/getcategoric/"+id,
        params:{
          action:'get'
        }
      });
      return(request.then(handleSuccess,handleError));
    }

    function getStoryWithPagination(id,page){
      var request=$http({
        method:'GET',
        url:domainConstant.storyApi+"/getMobileOrdered/"+id+"/"+page,
        params:{
          action:'get'
        }
      });
      return(request.then(handleSuccess,handleError));
    }


    function getStoryWithID(id){
      var request=$http({
        method:'GET',
        url:domainConstant.storyApi+"/get/"+id,
        params:{
          action:'get'
        }
      });
      return(request.then(handleSuccess,handleError));
    }

//getUserStory
    function getUserStory(id){
      var request=$http({
        method:'GET',
        url:domainConstant.storyApi+"/getuserstory/"+id,
        params:{
          action:"get"
        }
      });
      return (request.then(handleSuccess,handleError));
    }
    function getUserPublishedStory(id){
      var request=$http({
        method:'GET',
        url:domainConstant.storyApi+"/getuserpublishedstory/"+id,
        params:{
          action:"get"
        }
      });
      return (request.then(handleSuccess,handleError));
    }

    function publishStory( storyId ) {
      var request = $http({
          method: "put",
          url: domainConstant.storyApi + "/publish/" + storyId,
          headers: {"Content-Type":"application/json"},
          data: {
              id: storyId
          }
      });
      return( request.then( handleSuccess, handleError ) );
    }

    function withdrawStory( storyId ) {
      var request = $http({
          method: "put",
          url: domainConstant.storyApi + "/unpublish/" + storyId,
          headers: {"Content-Type":"application/json"},
          data: {
              id: storyId
          }
      });
      return( request.then( handleSuccess, handleError ) );
    }

    function handleSuccess(response){
          return (response.data);
    }

    function handleError(response){
      if (!angular.isObject( response.data ) ||
                ! response.data.message
                ) {
                return( $q.reject( "An unknown error occurred." ) );
              }
            }
});
