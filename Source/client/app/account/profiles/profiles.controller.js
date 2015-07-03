'use strict';

angular.module('medCheckApp')
  .controller('ProfilesCtrl', function ($scope, User, Profile, Allergen, $rootScope, Modal, Auth, localStorageService) {

  // When registered or unregistered users perform a search from main, they are given the option
  // to save their criteria to a new profile, these functions read in the main.controller search
  // criteria.  LocalStorage is used in the event the user performs registration with oAuth (Google, Twitter..)
  // to maintian state when leaving the domain to authenticate with those providers.
  function getAge() {

    if(localStorageService.get('newAge')){
      $scope.IsThereLocalStorageSearchCriteria = true;
      console.log(localStorageService.get('newAge'));
      return localStorageService.get('newAge');
    }
    return "";
  }

  function getAllergens() {

    if(localStorageService.get('newAllergens')){
      $scope.IsThereLocalStorageSearchCriteria = true;

      var arrAllergen = [];
      var newAllergen = localStorageService.get('newAllergens'); //stored array values
      var allergen;
      var i = 0;

      for (allergen in newAllergen){

        //Create new instance of Allergin
        var _allergen = new Allergen({
          _name: String
        });

        //Populate allergen and load to Array
        _allergen.name = angular.uppercase(newAllergen[allergen]);
        arrAllergen[i] = _allergen;
        i++;

        //console.log(newAllergen[allergen]);
      }

      return arrAllergen;
    }
    return "";
  }

  function getIsPregnantNursing() {

    if(localStorageService.get('newPreg')){
      $scope.IsThereLocalStorageSearchCriteria = true;

      console.log(localStorageService.get('newPreg'));
      return localStorageService.get('newPreg');
    }
    return 0;
  }

  $scope.frmProfile = {};
  $scope.frmProfile.name = "";
  $scope.frmProfile.age = getAge();
  $scope.frmProfile.gender = "";
  $scope.frmProfile.pregnant = getIsPregnantNursing();
  $scope.frmProfile.allergen = "";
  $scope.IsThereLocalStorageSearchCriteria = false; //Tracks if any user is building a profile based on main.controller search.

  $rootScope.user = User.get(); 
  //$rootScope.user = Auth.getCurrentUser(); 
  var user =  $rootScope.user;
  $rootScope.profiles = user.profiles;              

  $scope.addAllergen = function (form2, objProfile) {
   
    if ($scope.frmProfile.allergen != '' && form2.$valid) {
    
      //Create new instance of Allergin
      var _allergen = new Allergen({
        _name: String
      }); 
      
      //Populate allergen and load to Array
      _allergen.name = angular.uppercase($scope.frmProfile.allergen);
    
      //Set local profile's allergen to add   
      objProfile.allergens =  _allergen;    
   
      //Local scope user instance
      var _user = $rootScope.user;
      Profile.addAllergen(objProfile, function (res) {

        if (typeof res === 'object') {
          angular.forEach($rootScope.user.profiles, function (u, i) {
            if (objProfile._id === $rootScope.user.profiles[i]._id) {     

              $rootScope.user = res;
              $rootScope.user.profiles = res.profiles;
              
              //Clear Form Scope
              $scope.frmProfile.allergen = '';

              toastr.success('You may now use MedCheck to search for possible allergens. ', 'Allergen Saved!');
            }
          });
        } else {
          // invalid response            
          toastr.error('Something is amiss, unable to save profile.', 'Ah, Snap!');
        }
      });
    }
  };

  $scope.confirmAllergenDelete = Modal.confirm.delete(function (objAllergen, objProfile) {
    $scope.dropallergen(objAllergen, objProfile);
  });

  $scope.dropallergen = function (objAllergen, objProfile) { 
    
    //Set local profile's allergen to drop
    objProfile.allergens = objAllergen;
    
    //Local scope user instance
    var _user = $rootScope.user;
    Profile.dropAllergen(objProfile, function (res) {

      if (typeof res === 'object') {
        angular.forEach($rootScope.user.profiles, function (u, i) {
          if (objProfile._id === $rootScope.user.profiles[i]._id) {
           
            $rootScope.user = res;
            $rootScope.user.profiles = res.profiles;

            toastr.success('You may now use MedCheck to search for possible allergens. ', 'Allergen Removed!');
          }
        });
      } else {
        // invalid response            
        toastr.error('Something is amiss, unable to save profile.', 'Ah, Snap!');
      }

    });
  };

  $scope.confirmDelete = Modal.confirm.delete(function (obj) {
    $scope.deleteprofile(obj);
  });

  $scope.deleteprofile = function (obj) { 
    //Local scope user instance
    var _user = $rootScope.user;
    User.dropProfile(obj, function (res) {

      if (typeof res === 'object') {
        angular.forEach($rootScope.user.profiles, function (u, i) {
          if (obj._id === $rootScope.user.profiles[i]._id) {
 
            $rootScope.user.profiles.splice(i, 1);

            toastr.success('You may add additional profiles if needed.', 'Profile Deleted!');
          }
        });
      } else {
        // invalid response            
        toastr.error('Something is amiss, unable to save profile.', 'Ah, Snap!');
      }
    });
  };

  // Returns a random number between min (inclusive) and max (exclusive)
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**  Update existing User
   * 
   * This function does not update User, a local instance of user
   * is populated with the new profile and allergens then packaged
   * back unto the user document.  addProfile API will push profile 
   * and allergen updates into the User document.   
  */
  $scope.addProfile = function (form) {

    $scope.submitted = true;

    if (form.$valid) {

      $scope.submitted = false;
      //Local scope user instance
      var _user = $rootScope.user;      
  
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
      
      // populate profile with data   
      _profile.profilename = angular.uppercase($scope.frmProfile.name);
      _profile.age = $scope.frmProfile.age;
      _profile.gender = $scope.frmProfile.gender;
      _profile.pregnant = $scope.frmProfile.pregnant;

      if ($scope.frmProfile.gender === 'Male')
      { _profile.avatar = 'div-with-hipster' + getRandomArbitrary(1, 5); } //Random number 1-5 for dynamic male avatar demo
      else
      { _profile.avatar = 'div-with-hipster' + getRandomArbitrary(6, 10); } //Random number 6-10 for dynamic female avatar demo
      
      _profile.allergens = getAllergens(); //arrAllergen;
      _user.profiles = _profile;

      User.addProfile(_user, function (res) {

        if (typeof res === 'object') {
          toastr.success('You may now use MedCheck to search for possible allergens. ', 'Profile Saved!');

          $rootScope.user = res;
          $rootScope.user.profiles = res.profiles;   
                      
          //Clear Form Scope
          $scope.frmProfile.name = '';
          $scope.frmProfile.age = '';
          $scope.frmProfile.gender = '';
          $scope.frmProfile.pregnant = '';
          
          //Profile Saved, delete stored search criteria for next use.
          if($scope.IsThereLocalStorageSearchCriteria){
            localStorageService.clearAll();
            $scope.IsThereLocalStorageSearchCriteria = false;            
          }

        } else {
          // invalid response            
          toastr.error('Something is amiss, unable to save profile.', 'Ah, Snap!');
        }

      });
    }
  };
  
});


