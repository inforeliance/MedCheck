'use strict';

angular.module('medCheckApp')
  .controller('ProfilesCtrl', function ($scope, $http, Auth, User, Profile, Allergen, $q) {

  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.frmProfile = {};
  $scope.frmProfile.name = "";
  $scope.frmProfile.name = "";
  $scope.frmProfile.age = "";
  $scope.frmProfile.gender = "";
  $scope.frmProfile.pregnant = "";

  $scope.user = {};
  $scope.profiles = {};

  $http.get('/api/users/me').success(function (user) {
    $scope.user = user;
    $scope.profiles = user.profiles;
  });
       
  /**  Update existing User
   * 
   * This function does not update User, a local instance of user
   * is populated with the new profile and allergens then packaged
   * back unto the user document.  addProfile API will push profile 
   * and allergen updates into the User document.   
  */
  $scope.addProfile = function (form) {
      
    //Local scope user instance
    var _user = $scope.user;      

    //Local empty profile instance
    var _profile = new Profile({
      _profilename: String,
      _age: String,
      _gender: String,
      _pregnant: Number,
      _avatar: String,
      _allergens: [{
        name: String
      }]
   	});

    var i;
    var arrAllergen = new Array();
    for (i = 0; i < 5; i++) {       
           
      //Create new instance of Allergin
      var _allergen = new Allergen({
        _name: String
      }); 
      
      //Populate allergen and load to Array
      _allergen.name = $scope.frmProfile.gender + i;
      arrAllergen[i] = _allergen;
    };   
    
    // populate profile with data   
    _profile.profilename = $scope.frmProfile.name;
    _profile.age = $scope.frmProfile.age;
    _profile.gender = $scope.frmProfile.gender;
    _profile.pregnant = $scope.frmProfile.pregnant;
    _profile.avatar = '/sdsd/sdsd.png';
    _profile.allergens = arrAllergen;

    _user.profiles = _profile;

    if (form.$valid) {

      User.addProfile(_user, function (res) {
        console.log(res);
        //console.log(xmessage);
        if (typeof res === 'object') {
          toastr.success('You may now use MedCheck to search for possible allergens. ', 'Profile Saved!');

        } else {
          // invalid response            
          toastr.error('Something is amiss, unable to save profile.', 'Ah, Snap!');
        }

      });
    }   
      
    //Get Profile Response
    $http.get('/api/users/me').success(function (user) {
      //$scope.user = user;
      $scope.profiles = user.profiles;
    });
  };
});