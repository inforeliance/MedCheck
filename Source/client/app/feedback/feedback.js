'use strict';

angular.module('medCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('feedback', {
        url: '/feedback',
        templateUrl: 'app/feedback/feedback.html',
        controller: 'PolicyCtrl'
      });
  });