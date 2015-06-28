'use strict';

angular.module('medCheckApp')
	.controller('SandboxCtrl', function ($scope, $http, $location, Auth, User, Profile) {

	$scope.getCurrentUser = Auth.getCurrentUser;

	
	$scope.user = {};
    $scope.profiles = {};


	  $http.get('/api/users/me').success(function (user) {
	    $scope.user = user;
	    $scope.profiles.allergens = user.profiles;  
	    
	    console.log(user.profiles); // ToDo: SEE WHY CALL IS RUNNING MULTIPLE TIMES IN CHROME!    
	  });
	

	$scope.addItem = function (allergen) {
		console.log(allergen.name);
		$scope.profiles.push(profile);
		$scope.profiles = {};
	};
	

	$scope.removeItem = function (index) {
		$scope.items.splice(index, 1);
	};

});
  

