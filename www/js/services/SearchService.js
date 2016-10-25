angular.module('starter')

.service('SearchService', function( $http, $q, domainConstant ) {
        // Return public API.
        return({
            search: search
        });
        // PUBLIC METHODS
        function search(text) {
            var request = $http({
                method: "get",
                url: domainConstant.searchApi+ text
            });
            return( request.then( handleSuccess, handleError ) );
        }

        // PRIVATE METHODS.
        function handleError( response ) {
            if ( ! angular.isObject( response.data ) || ! response.data.message ) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            return( $q.reject( response.data.message ) );
        }
        function handleSuccess( response ) {
            return( response.data );
        }
});