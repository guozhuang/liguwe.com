'use strict';

var mainApplicationModuleName = 'liguwe.com';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','evernote','angular-loading-bar']);


// Configure the hashbang URLs using the $locationProvider services
mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});

