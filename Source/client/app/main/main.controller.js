'use strict';

(function () {
    angular.module("medCheckApp");
    var app = angular.module("medCheckApp");
    
    app.controller("MainCtrl", ["$rootScope", "$scope", "$http", "openFDA", "$q", "$timeout", "quagga", "$location", "$anchorScroll", "Auth", "User", "localStorageService", function ($rootScope, $scope, $http, openFDA, $q, $timeout, quagga, $location, $anchorScroll, Auth, User, localStorageService) {
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
            $scope.ageChoices = [{ minAge: 0, maxAge: 1, label: "12 months and under" }, { minAge: 1, maxAge: 5, label: "13 months - 5 years" }, { minAge: 5, maxAge: 12, label: "5 years - 12 years" }, { minAge: 13, maxAge: 100, label: "Over 12" }];
            $scope.selectedAge = {};
            $scope.nursingOrPregnant = false;
            $scope.cameraVisible = false;
            
            //Profile Scopes          
            $scope.isLoggedIn = Auth.isLoggedIn;
            $scope.user = Auth.getCurrentUser();
            $scope.user.profiles =  $scope.user.profiles;  
            
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
            };
            
            $scope.stopCamera = function () {
                $scope.cameraVisible = false;
                quagga.stop();
            };
            
            function resetFields() {
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
            
            $scope.SearchChanged = function () {
                resetFields();
            };
            
            $scope.BrandChanged = function () {
                resetFields();
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
            };
            
            $scope.findBrand = function () {
                
                openFDA.findByBrandName($scope.SearchValue).then(
                    function (products) {
                        $scope.BrandProductModels = products;
                        $location.hash('productSearchList');
                        $anchorScroll();
                    },

                    function (err) {
                        if (err.not_found) {
                            $scope.ShowBrandNotFoundErrorMessage = true;
                        } else {
                            console.log(err.resp);
                            toastr.error('Error when trying to find products by brand', 'Ah, Snap!');
                        }
                    });
            };
            
            $scope.performSearch = function (isValid) {
                if (isValid) {
                    verifyIngredients();

                    if ($scope.SearchValue.match(/^\d+$/)) {
                        $scope.scanBarCode();
                    }
                    else {
                        $scope.findBrand();
                    }
                }
            };
            
            $scope.selectProduct = function (product) {
                $scope.BrandProductModels = null; 
                
                //Loading local data storage with initial search for new profiles.
                //------------------------------------------------------------------             
                
                var _allergens = ["nuts", "bolts", "sugar", "butter"];
                var _age = 65;
                var _preg = 0;
                
                localStorageService.set('newAllergens', _allergens);
                localStorageService.set('newAge', _age);
                localStorageService.set('newPreg', _preg);            
   

                
                //-----------------------------------------------------------------
                
                if($scope.isLoggedIn()){
                    
                    console.log($scope.user);
                    console.log($scope.user.profiles);
                    
                    //Prints User Profiles
                    for (var profile in $scope.user.profiles) {
                        if ($scope.user.profiles.hasOwnProperty(profile)) {
                          
                            //Profiles
                            //console.log($scope.user.profiles[profile].profilename);
                           // console.log($scope.user.profiles[profile].age);
                           // console.log($scope.user.profiles[profile].avatar);
                           // console.log($scope.user.profiles[profile].gender);
                           // console.log($scope.user.profiles[profile].pregnant);
                           // console.log($scope.user.profiles[profile]._id);
                           // console.log($scope.user.profiles[profile].createdAt);
                            
                            //Allergens
                            for (var allergen in $scope.user.profiles[profile].allergens) {
                               if ($scope.user.profiles[profile].allergens.hasOwnProperty(allergen)) {                                   
                                 //  console.log($scope.user.profiles[profile].allergens[allergen].name);
                               }
                            };                             
                        }
                    };
                    
                   
                   
                   
                } else {
                    
                    console.log('User Not Logged In');
                }         
                
                var allergenNames = _.map($scope.allergens, function (x) { return x.name.toLowerCase().trim(); });
                var ingredientNames = _.map(product.Ingredients, function (x) { return x.Name.toLowerCase().trim(); });
                
                
               
                
                
               

                
                product.BadIngredients = _.filter(ingredientNames, function (ingredient) {
                    return _.find(allergenNames, function (allergen) {
                        return ingredient.indexOf(allergen) > -1 && allergen !== "";
                    });
                });
                
                if (!$scope.selectedAge.selected) {
                    product.ShowAgeWarning = false;
                }
                else {
                    product.ShowAgeWarning = product.minimumAge >= $scope.selectedAge.selected.maxAge || (product.minimumAge <= $scope.selectedAge.selected.maxAge && product.minimumAge >= $scope.selectedAge.selected.minAge);
                }
                
                $scope.ProductModel = product;
            };

            $scope.scanBarCode = function () {               
                return openFDA.findByUPC($scope.SearchValue).then(
                    function (product) {                        
                        $scope.selectProduct(product);
                    },
                    function (err) {
                        if (err.not_found) {
                            $scope.ShowNotFoundErrorMessage = true;
                        } else {
                            console.log(err.resp);
                            toastr.error('Error when trying to find a UPC code', 'Ah, Snap!');
                        }
                    });
            };
        }
    ]);


})();
