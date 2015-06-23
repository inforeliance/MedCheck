'use strict';

angular.module('medCheckApp')
  .controller('ProfilesCtrl', function ($scope, $http, Auth, User) {

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
      var _newProfile = $scope.user.profiles; 

      console.log(_user._id);
      
      console.log(_user.name);
      
      
      //_user.name = 'Frunkus';
      
      //console.log(_user.name);
      
      //User.addProfile({_id: _user._id }, _user);
    
      _newProfile.profilename = 'Test';
      _newProfile.age = 33;
      _newProfile.gender = 'M';
      _newProfile.pregnant = 0;
      _newProfile.avatar = '/sdsd/sdsd.png';
      _newProfile.allergens = '[{name: \'goose grease\'}]';
      
      console.log('new profile: ' + _newProfile);
      
      User.addProfile(_newProfile);

/*
      User.update(function () {
         $location.path('{_id: ' + user._id + '}');
         }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
         }); */
   };
});