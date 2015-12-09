'use strict'
/* global angular */

var app = angular.module('app', []);


app.controller("ShowController", ['$scope', '$http', function($scope, $http) {

    $scope.title = 'Show List';


    var refresh = function() {
        $http.get('/api/user/:_id').success(function(response) {
            $scope.showlist = response;
        });
    };

    refresh();

    
    // Turns number into array for ng-repeat
    $scope.getTimes=function(n){
        return new Array(n);
    };


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