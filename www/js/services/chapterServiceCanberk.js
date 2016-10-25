angular.module('bookstoreApp')

.service('chapterService', function( $http, $q, domainConstant ) {
        // Return public API.
        return({
            addChapter: addChapter,
            getChapter: getChapter,
            getChapters: getChapters
        });
        // PUBLIC METHODS
        function addChapter(status, name, chapterStatus, storyId, userId, text) {
            var request = $http({
                method: "post",
                url: domainConstant.chapterApi + "/create",
                headers: {"Content-Type":"application/json"},
                params: {
                    action: "add"
                },
                data: {
                	status: status,
                    name: name,
                    chapterstatus: chapterStatus,
                    storyID: storyId,
                    userID: userId,
                    textUrl: text
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        function getChapter(id) {
            var request = $http({
                method: "get",
                url: domainConstant.chapterApi + "/get/" + id,
                params: {
                    action: "get"
                }
            });
            return( request.then( handleSuccess, handleError ) );
        }
        function getChapters(storyId) {
            var request = $http({
                method: "get",
                url: domainConstant.chapterApi + "/get", //+ storyId
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