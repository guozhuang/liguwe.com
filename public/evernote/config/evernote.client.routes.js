// Invoke 'vaScript mode
'use strict';

// Configure the 'evernote' module routes
angular.module('evernote').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when('/:noteBookGuid/:noteGuid', {
            templateUrl: 'views/evernote.client.view.html',
            controller: 'EvernoteController'
        })
        .otherwise({
            redirectTo: '/c97457c4-f57e-44d4-878f-6a704f5357a4/0ed6ffc7-76e4-4a54-9175-f2603e7f0cc8'
        });
    }
]);