'use strict';

angular.module('medCheckApp')
  .controller('HelpCtrl', function ($scope, $http) {
    
    $scope.help = {};
    $scope.options = {};
    $scope.selectedOption = {};
   
    
    $scope.options = [ 
        { val: "Can't Access My Account" },
        { val: "I have a question before I register" }, 
        { val: "I want to request a feature" }, 
        { val: "I think something is broken" }, 
        { val: "I need you to walk me through how something works" }, 
        { val: "Other" } 
    ];
    
   //$scope.selectedOption = $scope.options[0];
    

  /**
   * Future Feature to Load FAQ page.
   */
  $scope.fireFaq = function () {
    
    toastr.warning('Simulated FAQ Page Loading for Prototype', 'PROTOTYPE: FAQ Page Loaded');
  };
  
  /**
   * Future Feature to Load FAQ page.
   */
  $scope.fireTwitter = function () {
    
    toastr.warning('Simulated Twitter Page Loading for Prototype', 'PROTOTYPE: Twitter Page Loaded');
  };
  
  /**
   * Future Feature to Load FAQ page.
   */
  $scope.fireTicket = function (form) {
     $scope.submitted = true;
     if(form.$valid) {
        $scope.submitted = false;
       //console.log($scope.selectedOption.val);
       
       $scope.help.issue = "";
       $scope.help.issue = "";
       $scope.help.email = "";
       $scope.help.upload = null;
       
        toastr.warning('Simulated Ticket Submission for Prototype', 'PROTOTYPE: Ticket Submitted');      
     }
  };
  

  




});