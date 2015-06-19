'use strict';

/**
 * @ngdoc function
 * @name dieLessApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dieLessApp
 */
angular.module('dieLessApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
