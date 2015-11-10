'use strict'
/* global angular */

var app = angular.module('app', []);


app.controller("MainController", ['$scope', '$http', function($scope, $http) {

    $scope.title = 'My Show List';


    var refresh = function() {
        $http.get('/api/showlist').success(function(response) {
            $scope.showlist = response;
            $scope.show = "";
        });
    };

    refresh();

    $scope.add = function() {
        $http.post('/api/showlist', main.add).success(function(response) {
            main.add.clearData();
            refresh();
        });
    };

    $scope.remove = function(id) {
        $http.delete('/api/showlist/delete/' + id).success(function(response) {
            refresh();
        });
    };
    
    // Turns number into array for ng-repeat
    $scope.getTimes=function(n){
        return new Array(n);
    };


//TODO Implement edit and update functions
 /*   $scope.edit = function(id) {
        $http.get('edit/showlist/' + id).success(function(response) {
            console.log('edit: ' + id);
            console.log($scope.show);

            $scope.show = response;
        });
    };

     $scope.update = function() {
        $http.put('edit/showlist/' + $scope.show._id, $scope.show).success(function(response) {
            console.log($scope.show);
            refresh();
        });
    };
*/

    // For list ordering
    var main = this;

    var data = function() {
        this.rating=0;
        this.title='';
        this.year='';
        this.description='';
    };

    data.prototype.clearData = function() {
        this.rating=0;
        this.title='';
        this.year='';
        this.description='';
    };

    main.update = new data();
    main.add = new data();
 

    main.searchInput = '';
    main.editing = false;
    main.orders = [
        {
            id: 1,
            title: 'Year Ascending',
            key: 'year',
            reverse: false
        },
        {
            id: 2,
            title: 'Year Descending',
            key: 'year',
            reverse: true
        },
        {
            id: 3,
            title: 'Title Ascending',
            key: 'title',
            reverse: false
        },
        {
            id: 4,
            title: 'Title Descending',
            key: 'title',
            reverse: true
        }
    ];
    main.order = main.orders[0];

}]);