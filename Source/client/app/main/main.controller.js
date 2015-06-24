//'use strict';

// Code goes here
(function() {
    var app = angular.module("medCheckApp");

    app.controller("MainCtrl", ["$scope", "openFDA",
        function($scope, openFDA) {

            try {
                toastr.warning('Prototype demonstration, not for actual medical use.', 'MedCheck Prototype', {
                    timeOut: 5000
                });
            } catch(e) { /* I'm so sorry */ }

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

            $scope.UPCChanged = function() {
                ResetFields();
            };

            $scope.BrandChanged = function() {
                ResetFields();
            };

            $scope.FindBrand = function() {
                openFDA.findByBrandName($scope.BrandName).then(
                    function(products) {
                        $scope.BrandProductModels = products;
                    },
                    function(err) {
                        if (err.not_found) {
                            $scope.ShowBrandNotFoundErrorMessage = true;
                        } else {
                            console.log(err.resp);
                            alert("Something went very wrong");
                        }
                    });
            };

            $scope.scanBarCode = function() {
                return openFDA.findByUPC($scope.UPC).then(
                    function(product) {
                        $scope.ProductModel = product;
                    },
                    function(err) {
                        if (err.not_found) {
                            $scope.ShowNotFoundErrorMessage = true;
                        } else {
                            console.log(err.resp);
                            alert("Something went very wrong");
                        }
                    });
            };
        }
    ]);

})();
