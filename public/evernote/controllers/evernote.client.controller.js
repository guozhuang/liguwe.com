'use strict';
// Create the 'evernote' controller
angular.module('evernote').controller('EvernoteController', ['$scope', '$routeParams', '$location', 'EvernoteAPI', '$sce',
    function ($scope, $routeParams, $location, EvernoteAPI, $sce) {

        $scope.isClickStack = true;
        $scope.isShowModal = false;

        $scope.currentNote = $routeParams.noteGuid;


        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };

        $scope.showModal = function () {
            $(function () {
                if (!$scope.isShowModal) {
                    $(".notesNav").hide();
                    $(".NoteBookNavModal").css({"opacity":0,"display":"block"}).animate({"opacity":"0.8"});
                    $(".noteBooksNav").animate({"left": 0}, "normal", function () {
                        $scope.isShowModal = true;
                    });
                } else {
                    $(".notesNav").show();
                    $(".NoteBookNavModal").hide("normal");
                    $(".noteBooksNav").animate({"left": "-25%"}, "normal", function () {
                        $scope.isShowModal = false;
                    });
                }
            });
        };

        $scope.clickNoteBookTitle = function ($event) {
            EvernoteAPI.notesListAPI.query({
                noteBookGuid: angular.element($event.target).attr("bookguid")
            }).$promise.then(function (result) {
                if (result.length > 1) window.location.href = '#!' + result[1].notebookGuid + "/" + result[1].guid;
            });
        };


        $scope.$on('$viewContentLoaded', function(event) {
            var h = $(document).height()-50;
            $(".noteList").height(h);
            $(".noteBookList ").height(h);
            $(".content-body").height(h);
            $(".content-header span.fa").click(function(){
                var expand = $(".content-con");
                if(!expand.hasClass("full-screen")){
                    expand.addClass("full-screen");
                    $(this).addClass("close").removeClass("fa-expand");
                }else {
                    expand.removeClass("full-screen");
                    $(this).removeClass("close").addClass("fa-expand");
                }
            });
        });


        $scope.findBookList = function () {
            $scope.bookStacks = EvernoteAPI.noteBookListAPI.query();
        };


        $scope.findOneNote = function () {
            $scope.note = EvernoteAPI.noteAPI.get({
                noteGuid: $routeParams.noteGuid
            });
        };

        $scope.findNotesList = function () {
            $scope.notes = EvernoteAPI.notesListAPI.query({
                noteBookGuid: $routeParams.noteBookGuid
            });
        };
    }
]);