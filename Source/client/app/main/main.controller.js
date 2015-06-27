//'use strict';

(function () {
    angular.module("medCheckApp");
    var app = angular.module("medCheckApp");
       
    app.controller("MainCtrl", ["$scope", "openFDA","$q","$timeout", function ($scope, openFDA, $q,$timeout) {
            
            // Display a warning toast, with no title
            toastr.warning('Prototype demonstration, not for actual medical use.', 'MedCheck Prototype', { timeOut: 5000 });
            
            $scope.UPC = "0075609000935";
            //$scope.MedicationName = "Advil";
            
            $scope.allergens = [{name: ""}];
            $scope.showAllergen = false;
            $scope.showAge = false;
            $scope.showPregnant = false;
            $scope.ingredientNamesChecked = {};
            $scope.ageChoices = [{age: 1*12, label: "12 months and under"}, { age: 5*12, label: "13 months - 5 years" }, {age: 11*12, label: "5 years - 11 years"}, {age: 100*12, label: "12 years and over"}]
            
            function ResetFields() {
                $scope.ShowBrandNotFoundErrorMessage = false;
                $scope.ShowNotFoundErrorMessage = false;
                $scope.ProductModel = null;
                $scope.BrandProductModels = null;
            }
            
            function verifyIngredients(){
                var ingredientCalls = [];
                angular.forEach($scope.allergens, function (item) {
                    if (item.name !== "") {                        
                        if (!$scope.ingredientNamesChecked.hasOwnProperty(item.name)) {
                            ingredientCalls.push(openFDA.findIngredient(item.name));
                        }
                    }
                });
                
                function processResults(data){
                    for (var i = 0; i < data.length; i++) {
                        $scope.ingredientNamesChecked[data[i].ingredient] = true;
                        for (var j = 0; j < $scope.allergens.length; j++) {
                            if (data[i].ingredient === $scope.allergens[j].name) {
                                $scope.allergens[j].invalidIngredient = data[i].not_found;                                
                                break;
                            }
                        }
                    }
                    $('[data-toggle="tooltip"]').tooltip();
                }

                $q.allSettled(ingredientCalls).then(processResults, processResults);
            }
            
            $scope.UPCChanged = function () {
                ResetFields();
            };
            
            $scope.BrandChanged = function () {
                ResetFields();
            };
            
            $scope.removeAllergen = function (allergen) {
                console.log(allergen);
                $scope.allergens.splice($scope.allergens.indexOf(allergen), 1);
                if ($scope.allergens.length === 0) {
                    $scope.addAllergen();
                }
            };
            
            $scope.addAllergen = function (){

                $("#allergyFocusElement").removeAttr("id");
                $scope.allergens.push({ name: "" });
                $timeout(function () {
                    $("#allergyFocusElement").focus();
                }, 0);
                
                verifyIngredients();
                           
            }
                       
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
                
                verifyIngredients();
                
                openFDA.findByUPC($scope.UPC).then(
                    function (product) {
                        var allergenNames = _.map($scope.allergens, function (x) { return x.name });
                        var ingredientNames = _.map(product.Ingredients, function (x) { return x.Name });                        
                        product.BadIngredients = _.intersection(ingredientNames, allergenNames);
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