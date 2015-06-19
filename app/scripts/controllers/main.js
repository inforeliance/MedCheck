'use strict';

/**
 * @ngdoc function
 * @name dieLessApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dieLessApp
 */
angular.module('dieLessApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
