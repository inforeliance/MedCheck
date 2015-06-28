'use strict';

angular.module('medCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('help', {
        url: '/help',
        templateUrl: 'app/help/help.html',
        controller: 'HelpCtrl',
        authenticate: false        
      });
  });
