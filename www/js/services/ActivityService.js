'use strict';
angular.module('starter')

.service('ActivityService', function( $http, $q, domainConstant ) {
        // Return public API.
        return({
            getUserActivities: getUserActivities
        });
        // PUBLIC METHODS
        function getUserActivities(userId) {
            var request = $http({
                method: "get",
                url: domainConstant.activityApi + "/getuseractivity/" + userId,
                params: {
                    action: "get"
                }
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
