'use strict';

angular.module('medCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('policy', {
        url: '/policy',
        templateUrl: 'app/policy/policy.html',
        controller: 'PolicyCtrl'
      });
  });