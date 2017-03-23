angular.module('starter')

.service('NotificationService', function( $http, $q, domainConstant ) {
   // Return public API.
    return({
        sendNotification: sendNotification,
        getUserNotifications: getUserNotifications,
        deleteNotification: deleteNotification,
        readNotification: readNotification
    });
    // PUBLIC METHODS
    function sendNotification(text,username,type,sendBy) {
        var request = $http({
            method: "post",
            url: "http://kittbook.com/api/new-notification", //domainConstant.api 'http://localhost:8080' 
            headers: {"Content-Type":"application/json"},
            data: {text: text, username:username, notificationType: type, sendBy: sendBy}
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function getUserNotifications(username) {
        var request = $http({
            method: "get",
            url: domainConstant.notificationApi + "/get/" + username
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function deleteNotification(id) {
        var request = $http({
            method: "get",
            url: domainConstant.notificationApi + "/delete/" + id,
            headers: {"Content-Type":"application/json"},
            data: {id: id}
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function readNotification(notificationId) {
        var request = $http({
            method: "post",
            url: domainConstant.notificationApi + "/read",
            headers: {"Content-Type":"application/json"},
            data: {id: notificationId} 
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