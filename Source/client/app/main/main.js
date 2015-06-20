/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

angular.module('medCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });