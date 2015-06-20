'use strict';

angular.module('medCheckApp')
  .controller('SandboxCtrl', function ($scope, $http, Auth) {
    
   console.log('I Made it here.');
    
   $scope.getCurrentUser = Auth.getCurrentUser;
   
   $scope.user = [];
   $scope.profiles = [];
   $scope.allergens = [];

    $http.get('/api/users/me').success(function(user) {
      $scope.user = user;
      $scope.profiles = user.profiles;
        
      console.log(user.profiles);
      console.log(user.name);
    });    
  });
  

