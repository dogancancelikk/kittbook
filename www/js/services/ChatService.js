'use strict';
angular.module('starter')
.service('ChatService', function( $http, $q, domainConstant ) {
        // Return public API.
        return({
            getMessages: getMessages,
            getAllMessages: getAllMessages,
            sendMessage: sendMessage,
            deleteMessage: deleteMessage,
            deleteConversation: deleteConversation
        });
        // PUBLIC METHODS
        function getMessages(userId, receiverId) {
            var request = $http({
                method: "post",
                url: domainConstant.messageApi + "/get",
                headers: {"Content-Type":"application/json"},
                data : { id: 0, user: userId, other: receiverId}
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function getAllMessages(userId) {
            var request = $http({
                method: "get",
                url: domainConstant.messageApi + "/getlastmessages/" + userId
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function sendMessage(senderId, receiverId, text) {
            var request = $http({
                method: "post",
                url: domainConstant.messageApi + "/send",
                headers: {"Content-Type":"application/json"},
                data : { id: 0, sender: senderId, receiver: receiverId, text: text}
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function deleteMessage(userId, messageId) {
            var request = $http({
                method: "post",
                url: domainConstant.messageApi + "/delete",
                headers: {"Content-Type":"application/json"},
                data : { id: messageId, user: userId}
            });
            return( request.then( handleSuccess, handleError ) );
        }

        function deleteConversation(userId, receiverId) {
            var request = $http({
                method: "delete",
                url: domainConstant.messageApi + "/deleteall",
                headers: {"Content-Type":"application/json"},
                data : { id: 0, user: userId, other: receiverId}
            });
            return( request.then( handleSuccess, handleError ) );
        }

        // PRIVATE METHODS.
        function handleError( response ) {
            if (! angular.isObject( response.data ) || ! response.data.message) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            return( $q.reject( response.data.message ) );
        }
        function handleSuccess( response ) {
            return( response.data );
        }
});
