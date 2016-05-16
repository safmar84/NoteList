// create module with dependency on firebase for using AngularFire services and on angular-translate
var noteListApp = angular.module("noteListApp", ["firebase", "pascalprecht.translate", "ui.router"]);


// construct controller with injected $firebaseArray services
noteListApp.controller("NoteListCtrl", ["$scope", "$firebaseArray", "$translate",
    function($scope, $firebaseArray, $translate) {

        // binding a model to a firebase URL
        var ref = new Firebase("https://safmar84-notelist.firebaseio.com/");
        $scope.notes = $firebaseArray(ref);

        // add note
        $scope.addNote = function(e) {
            if (e.keyCode == 13 && $scope.note) {
                $scope.notes.$add( { archived: false, text: $scope.note} );
                // reset local note for a next add
                $scope.note = "";
            }
        }
        
        // archiving and unarchiving note
        $scope.archiveNote = function(note) {
            note.archived = !note.archived;
            $scope.notes.$save(note);
        }
        
        // delete note
        $scope.deleteNote = function(note) {
            $scope.notes.$remove(note);
        }
        
        // translate buttons action
        $scope.changeLanguage = function(langKey) {
            $translate.use(langKey);
        }
    }
]);


// translation module configuration
noteListApp.config(['$translateProvider', 
    function ($translateProvider) {
        
        // cz translate table
        $translateProvider.translations('cz', {
            TITLE: 'Poznámky',
            INSERT: 'nová poznámka...'
        });
        
        // en translate table
        $translateProvider.translations('en', {
            TITLE: 'Notelist',
            INSERT: 'new note...'
        });
        
        $translateProvider.preferredLanguage('cz');
    }
]);

noteListApp.config(
    function($stateProvider, $urlRouterProvider){
        
        // For any unmatched url, send to /notes
        $urlRouterProvider.otherwise("/notes")

        
    }
);