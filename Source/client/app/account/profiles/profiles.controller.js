'use strict';

angular.module('medCheckApp')
  .controller('ProfilesCtrl', function ($scope, $http, Auth, User, Profile, Allergen) {

   $scope.getCurrentUser = Auth.getCurrentUser;
   
   $scope.frmProfile = {};
   $scope.frmProfile.name = "";
   $scope.frmProfile.name = "";
   $scope.frmProfile.age = "";
   $scope.frmProfile.gender = "";
   $scope.frmProfile.pregnant = "";


   $scope.user = {};
   $scope.profiles = {};
   var allergensArr = {};

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
   $scope.addProfile = function (form) {
      
      //Local scope user instance
      var _user = $scope.user;
      
      //var profile = this;
      
      
      
      allergensArr = JSON.stringify({name: $scope.frmProfile.gender});
      
      //var json = '{ "name": "John Smith" }';       //Let's say you got this
      var json = allergensArr;
      json = json.replace(/\"([^(\")"]+)\":/g,"$1: ");  //This will remove all the quotes
      //json;                                        //'{ name: "John Smith" }'
      
      //json = JSON.parse(json.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":'));
      
      //= allergensArr + $scope.frmProfile.gender + ',';
      console.log(json);

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
      
      
      
      
      var i;
      var arrAllergen = new Array();
      for (i = 0; i < 5; i++) {
           
         //Create new instance of Allergin
         var _allergen = new Allergen ({
            _name: String
         }); 
      
         //Populate allergen and load to Array
         _allergen.name = $scope.frmProfile.gender + i;
         arrAllergen[i] = _allergen;
       };
      
      //Populate allergen with data
      //_allergen.name = '{name: \'Anticonvulsants\'}, {name: \'Hives\'}'; //not working
      //_allergen.name = 'Anticonvulsants|Hives';
    
      // populate profile with data   
      _profile.profilename = $scope.frmProfile.name;
      _profile.age = $scope.frmProfile.age;
      _profile.gender = $scope.frmProfile.gender;
      _profile.pregnant = $scope.frmProfile.pregnant;
      _profile.avatar = '/sdsd/sdsd.png';
      _profile.allergens = arrAllergen;
      //_profile.allergens = [{name: $scope.frmProfile.gender}]; //working
      //_profile.allergens = [{name: "foo"},{name: "bar"}]; //working
      
      _user.profiles = _profile;
      
      console.log('new profile: ' + _profile);
      console.log('{_id: ' + _user._id + '} ');
      
      User.addProfile(_user);
      
      //Get Profile Response
      $http.get('/api/users/me').success(function (user) {
      $scope.user = user;
      $scope.profiles = user.profiles;

      console.log(user.name);
      console.log(user.profiles);
      
      // Display a success toast, with a title
      toastr.success('You may now use MedCheck to search for possible allergens.', 'Profile Saved!');  
      
      $scope.reset();
   });

   };
});