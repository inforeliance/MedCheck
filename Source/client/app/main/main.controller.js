//'use strict';

(function () {
    angular.module("medCheckApp");
    var app = angular.module("medCheckApp");
    
    app.controller("MainCtrl", ["$scope", "openFDA", "$q", "$timeout","quagga", function ($scope, openFDA, $q, $timeout, quagga) {
            // Display a warning toast, with no title
            try {
                toastr.warning('Prototype demonstration, not for actual medical use.', 'MedCheck Prototype', {
                    timeOut: 5000
                });
            } catch (e) { /* I'm so sorry */ }
            
            $scope.SearchValue = "";  //0075609000935, 0840986023781
            //$scope.MedicationName = "Advil";
            
            $scope.allergens = [{ name: "" }];
            $scope.showAllergen = false;
            $scope.showAge = false;
            $scope.showPregnant = false;
            $scope.ingredientNamesChecked = {};
            $scope.ageChoices = [{ minAge: 0, maxAge: 1, label: "12 months and under" }, { minAge: 1, maxAge: 5, label: "13 months - 5 years" }, { minAge: 5, maxAge: 12, label: "5 years - 12 years" }, { minAge: 13, maxAge: 100, label: "Over 12" }]
            $scope.selectedAge = {};
            $scope.nursingOrPregnant = false;
            $scope.cameraVisible = false;
            
            $scope.startCamera = function () {
                quagga.start();
                $scope.cameraVisible = true;
                quagga.onDetected(function (result) {
                    
                    var code = result.codeResult.code;
                    try {
                        $scope.stopCamera();
                    } catch (e) { } //seems to be a bug in quaggaJS when you start and stop

                    $scope.SearchValue = code;
                    
                    toastr.success('Found barcode: ' + code, 'Scanned UPC code successfully', {
                        timeOut: 3000
                    });

                    $timeout(function () {
                        //make sure apply gets called 
                    }, 0);

                });
            }
            
            $scope.stopCamera = function () {
                $scope.cameraVisible = false;
                quagga.stop();
            }
            
            function ResetFields() {
                $scope.ShowBrandNotFoundErrorMessage = false;
                $scope.ShowNotFoundErrorMessage = false;
                $scope.ProductModel = null;
                $scope.BrandProductModels = null;
            }
            
            
            function verifyIngredients() {
                var ingredientCalls = [];
                angular.forEach($scope.allergens, function (item) {
                    if (item.name !== "") {
                        if (!$scope.ingredientNamesChecked.hasOwnProperty(item.name)) {
                            ingredientCalls.push(openFDA.findIngredient(item.name));
                        }
                    }
                });
                
                function processResults(data) {
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
            
            $scope.addAllergen = function () {
                
                $("#allergyFocusElement").removeAttr("id");
                $scope.allergens.push({ name: "" });
                $timeout(function () {
                    $("#allergyFocusElement").focus();
                }, 0);
                
                verifyIngredients();
                           
            }
            
            $scope.findBrand = function () {
                
                openFDA.findByBrandName($scope.SearchValue).then(
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
            
            $scope.performSearch = function (isValid) {
                if (isValid) {
                    if ($scope.SearchValue.match(/^\d+$/)) {
                        $scope.scanBarCode();
                    }
                    else {
                        $scope.findBrand();
                    }
                }
            };
            
            $scope.scanBarCode = function () {
                
                verifyIngredients();
                
                return openFDA.findByUPC($scope.SearchValue).then(
                    function (product) {
                        var allergenNames = _.map($scope.allergens, function (x) { return x.name });
                        var ingredientNames = _.map(product.Ingredients, function (x) { return x.Name });
                        product.BadIngredients = _.intersection(ingredientNames, allergenNames);
                        
                        if (!$scope.selectedAge.selected) {
                            product.ShowAgeWarning = false;
                        }
                        else {
                            product.ShowAgeWarning = product.MinimumAge >= $scope.selectedAge.selected.maxAge || (product.MinimumAge <= $scope.selectedAge.selected.maxAge && product.MinimumAge >= $scope.selectedAge.selected.minAge);
                        }
                        
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
        }
    ]);


})();
