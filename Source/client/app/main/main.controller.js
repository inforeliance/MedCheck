//'use strict';

//angular.module('medCheckApp')
//  .controller('MainCtrl', function ($scope, $http, $openFDA) {
//    $scope.awesomeThings = [];
//    $scope.showAllergen = false;
//    $scope.showAge = false;
//    $scope.showPregnant = false;

//    $http.get('/api/things').success(function (awesomeThings) {
//        $scope.awesomeThings = awesomeThings;
//    });
    
//    $scope.scanBarCode = function () {
//        alert("asd");
//    };
    
//    $scope.toggleAlergen = function (){
//        return $scope.showAllergen = !$scope.showAllergen;
//    }
    
//    $scope.addThing = function () {
//        if ($scope.newThing === '') {
//            return;
//        }
//        $http.post('/api/things', { name: $scope.newThing });
//        $scope.newThing = '';
//    };
    
//    $scope.deleteThing = function (thing) {
//        $http.delete('/api/things/' + thing._id);
//    };
//});

// Code goes here
(function () {
    var app = angular.module("medCheckApp");
    
    app.controller("MainCtrl", ["$scope", "openFDA", function ($scope, openFDA) {
            $scope.AppTitle = "Die.Less";
            $scope.UPC = "0075609000935";
            //$scope.MedicationName = "Advil";
            
            $scope.awesomeThings = [];
            $scope.showAllergen = false;
            $scope.showAge = false;
            $scope.showPregnant = false;
            
            function ResetFields() {
                $scope.ShowBrandNotFoundErrorMessage = false;
                $scope.ShowNotFoundErrorMessage = false;
                $scope.ProductModel = null;
                $scope.BrandProductModels = null;
            }
            
            $scope.UPCChanged = function () {
                ResetFields();
            };
            
            $scope.BrandChanged = function () {
                ResetFields();
            };
            
            $scope.FindBrand = function () {
                openFDA.findByBrandName($scope.BrandName).then(
                    function (products) {
                        $scope.BrandProductModels = products;
                    },
        function (err) {
                        if (err.not_found) {
                            $scope.ShowBrandNotFoundErrorMessage = true;
                        } else {
                            console.log(err.resp);
                            alert("Something went very wrong");
                        }
                    });
            };
            
            $scope.scanBarCode = function () {
                openFDA.findByUPC($scope.UPC).then(
                    function (product) {
                        $scope.ProductModel = product;
                    },
        function (err) {
                        if (err.not_found) {
                            $scope.ShowNotFoundErrorMessage = true;
                        } else {
                            console.log(err.resp);
                            alert("Something went very wrong");
                        }
                    });
            };
        }]);

})();