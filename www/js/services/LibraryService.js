angular.module('starter')

.service('LibraryService', function( $http, $q, domainConstant ) {
        // Return public API.
        return({
            getLibrary: getLibrary,
            addStoryToLibrary: addStoryToLibrary,
            removeStory: removeStory,
            hasStory:hasStory,
          deleteStoryFromLibrary:deleteStoryFromLibrary
        });
   
        function hasStory(libraryId,storyId){
          var request=$http({
            method:'get',
            url:domainConstant.libraryApi+"/hasstory/"+libraryId+","+storyId,
            headers: {"Content-Type":"application/json"},
            params: {
                    action: "get"
            } 
          });
          return (request.then(handleSuccess,handleError))
        }      
        
          function deleteStoryFromLibrary(libraryId,storyId){
             var request = $http({
                method: "delete",
                url: domainConstant.libraryApi + "/deletestory/" + libraryId + "," + storyId,
                headers: {"Content-Type":"application/json"},
                data: { storyId: storyId, 
                       libraryId: libraryId }
            });
            return( request.then( handleSuccess, handleError ) );
          }
  
  
         function addStoryToLibrary( libraryId, storyId ) {
            var request = $http({
                method: "post",
                url: domainConstant.libraryApi + "/addstory",
                headers: {"Content-Type":"application/json"},
                params: {
                    action: "add"
                },
                data: {
                    libraryID: libraryId,
                    storyID: storyId
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        function getLibrary(userId) {
            var request = $http({
                method: "get",
                url: domainConstant.libraryApi + "/getUserLibrary/" + userId,
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        function removeStory( storyId ) {
            var request = $http({
                method: "delete",
                url: domainConstant.libraryApi + "/delete/" + storyId,
                params: {
                    action: "delete"
                },
                data: {
                    id: id
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        // PRIVATE METHODS.
        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                ! angular.isObject( response.data ) ||
                ! response.data.message
                ) {
                return( $q.reject( "An unknown error occurred." ) );
        }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
        }
        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {
            return( response.data );
        }
});