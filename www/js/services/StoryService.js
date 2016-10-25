angular.module('starter')

.service('StoryService', function($q,$http,domainConstant) {
    return({

      getUserStory:getUserStory,
      getStory:getStory,
      addStory:addStory,
      getStoryWithID:getStoryWithID,
      storyRate:storyRate
    })


    function addStory(name,ownerID,description,isCollective){
      var request=$http({
        method:'POST',
        url:domainConstant.storyApi+'/create',
        headers: {"Content-Type":"application/json"},
        params:{
          action:'add'
        },
        data: {
          id:0,
          name:name,
          ownerID:ownerID,
          image:"https://hd.unsplash.com/photo-1471890701797-59336a877de4",
          description:description,
          categoryID:1,
          isCollective:isCollective

        }
      });
      return (request.then(handleSuccess,handleError));
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
