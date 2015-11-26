'use strict';
// Create the 'evernote' service

angular.module('evernote').factory('EvernoteAPI', ['$resource', function ($resource) {

    var noteAPI = $resource('/api/note/:noteGuid', {
            noteGuid: '@noteGuid'
        }),
        notesListAPI = $resource('/api/notes/:noteBookGuid', {
            noteBookGuid: '@noteBookGuid'
        }),
        noteBookListAPI = $resource('/api/noteBooks', {});
    return {
        noteAPI:noteAPI,
        notesListAPI:notesListAPI,
        noteBookListAPI:noteBookListAPI
    }
}]);