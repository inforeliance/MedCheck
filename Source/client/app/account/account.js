'use strict';

//Private State Provider for Registered Accounts

angular.module('medCheckApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('sandbox', {
        url: '/sandbox',
        templateUrl: 'app/account/sandbox/sandbox.html',
        controller: 'SandboxCtrl',
        authenticate: true
      })
      .state('profiles', {
        url: '/profiles',
        templateUrl: 'app/account/profiles/profiles.html',
        controller: 'ProfilesCtrl',
        authenticate: true
      });
  });