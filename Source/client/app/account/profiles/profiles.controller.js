'use strict';

angular.module('medCheckApp')
  .controller('ProfilesCtrl', function ($scope, $http, Auth, User, Profile, Allergen) {

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
       
   /**  Update existing User
    * 
    * This function does not update User, a local instance of user
    * is populated with the new profile and allergens then packaged
    * back unto the user document.  addProfile API will push profile 
    * and allergen updates into the User document.   
   */
   $scope.addProfile = function () {
      
      //Local scope user instance
      var _user = $scope.user;

      //Local empty profile instance
      var _profile = new Profile ({
   		 _profilename: String,
          _age: String,
          _gender: String,
          _pregnant: Number,
          _avatar: String,
          _allergens: [ { 
              name: String 
          } ] 
   	}); 
      
      //Local empty profile instance
      var _allergen = new Allergen ({
   		 _name: String
   	}); 
      
      /*
      var arr = [];
      var len = 5;
      for (var i = 0; i < len; i++) {
          _allergen.name = "Anticonvulsants " + i;
          arr.push({
              _allergen
          });
      } */
      
     
      
      //Populate allergen with data
      //_allergen.name = '{name: \'Anticonvulsants\'}, {name: \'Hives\'}'; //not working
      _allergen.name = 'Anticonvulsants|Hives';
    
      // populate profile with data   
      _profile.profilename = 'Test';
      _profile.age = 33;
      _profile.gender = 'M';
      _profile.pregnant = 0;
      _profile.avatar = '/sdsd/sdsd.png';
      _profile.allergens = [{name: "foo"},{name: "bar"}];
      //_profile.allergens = arr;
      
      _user.profiles = _profile;
      
      console.log('new profile: ' + _profile);
      console.log('{_id: ' + _user._id + '} ');
      
      //User.addProfile(_user._id, profile);
      User.addProfile(_user);

/*
      User.update(function () {
         $location.path('{_id: ' + user._id + '}');
         }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
         }); */
   };
});