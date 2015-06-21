'use strict';

angular.module('medCheckApp')
   .controller('SandboxCtrl', function ($scope, $http, $location, Auth, User) {

   $scope.getCurrentUser = Auth.getCurrentUser;


   $scope.user = {};
   $scope.profiles = {};
   $scope.allergens = {};

   $http.get('/api/users/me').success(function (user) {
      $scope.user = user;
      $scope.profiles = user.profiles;

      console.log(user.name);
      console.log(user.profiles);
   });
       
   // Update existing User
   $scope.update = function () {
      var _user = $scope.user;

      console.log(_user._id);
      
      console.log(_user.name);
      
      //_user.name = 'Frunkus';
      
      //console.log(_user.name);
      
      User.update({_id: _user._id }, _user);

/*
      User.update(function () {
         $location.path('{_id: ' + user._id + '}');
         }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
         }); */
   };
});
  

