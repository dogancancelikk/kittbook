angular.module('starter')

.service('PostService', function( $http, $q, domainConstant ) {
        // Return public API.
        return({
            addPost: addPost,
            getUserPosts: getUserPosts,
            deletePost:deletePost
        });
        // PUBLIC METHODS
        function addPost(userID, text) {
            var request = $http({
                method: "post",
                url: domainConstant.postApi + "/create",
                headers: {"Content-Type":"application/json"},
                params: {
                    action: "add"
                },
                data: {
                	userID: userID,
                    text: text,
                  status: "1"

                }
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function deletePost(id){
          var request = $http({
            method:"delete",
            url: domainConstant.postApi + "/delete/" + id,
            headers: {"Content-Type":"application/json"},
            data : {id:id}
          });
          return(request.then(handleSuccess,handleError));
        }


        function getUserPosts(userId) {
            var request = $http({
                method: "get",
                url: domainConstant.postApi + "/getuserposts/" + userId,
                params: {
                    action: "get"
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
