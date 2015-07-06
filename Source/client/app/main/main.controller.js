'use strict';

(function () {
    angular.module("medCheckApp");
    var app = angular.module("medCheckApp");

    app.controller("MainCtrl", ["$scope", "openFDA", "$q", "$timeout", "quagga", "$location", "$anchorScroll", "Auth", "User", "localStorageService", function ($scope, openFDA, $q, $timeout, quagga, $location, $anchorScroll, Auth, User, localStorageService) {
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
            $scope.selectedAge = {};
            $scope.nursingOrPregnant = false;
            $scope.cameraVisible = false;
            $scope.profileProductModels = [];
            $scope.isRegistered = false;
            $scope.loggedIn = false;

            $scope.hasNonEmptyAllergen = function(){
                return _.filter($scope.allergens, function(allergen) {
                    return allergen.name !== null && allergen.name !=="";
                }).length>0;
            };

            Auth.isLoggedInAsync(function (loggedIn) {
                $scope.loggedIn = loggedIn;
                if (loggedIn) {
                    User.get(function (user) {
                        $scope.user = user;
                        if ($scope.user.profiles && $scope.user.profiles.length > 0) {
                            $scope.profiles = $scope.user.profiles;
                            $scope.hasProfiles = true;
                        }
                    });
                }
            });

            //$scope.user.profiles =  $scope.user.profiles;

            $scope.startCamera = function () {
                quagga.start();
                $scope.cameraVisible = true;
                quagga.onDetected(function (result) {
                    if (!$scope.cameraVisible){
                      return;
                    }

                    var code = result.codeResult.code;
                    $scope.cameraVisible = false;
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
                $scope.profileProductModels.length = 0;
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
                        $location.hash('searchList');
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

            $scope.allergyKeyPress = function (keyCode, allergen, $event) {
                if (keyCode === 13) {
                    $scope.addAllergen();
                    $event.preventDefault();
                    return false;
                }
                else {
                    allergen.invalidIngredient = false;
                }
            };

            $scope.performSearch = function (isValid) {
                if (isValid) {
                    verifyIngredients();
                    $scope.profileProductModels.length = 0;
                    if ($scope.SearchValue.match(/^\d+$/)) {
                        $scope.scanBarCode();
                    }
                    else {
                        $scope.findBrand();
                    }

                    if (!$scope.hasProfiles) {
                        //Loading local data storage with initial search for new profiles. We're using local storage even though we're a SPA because we have oAuth, and the user can jump off the domain to authenticate.
                        //------------------------------------------------------------------
                        localStorageService.set('newAllergens', _.map($scope.allergens, function (x) { return x.name.toLowerCase().trim(); }));
                        localStorageService.set('newAge', $scope.selectedAge.selected ? $scope.selectedAge.selected.label : null);
                        localStorageService.set('newPreg', $scope.nursingOrPregnant ? 1 : 0);
                    //-----------------------------------------------------------------
                    }
                }
            };

            $scope.selectProduct = function (product) {
                $scope.profileProductModels.length = 0;


                function makeProductViewModelInfo(allergenNames, selectedAge, pregnant, profileName, profile){
                    var productViewModel = { product: product, showPregnancyWarnings : pregnant, profileName: profileName, profile: profile || {} };

                    var ingredientNames = _.map(product.Ingredients, function (x) { return x.Name.toLowerCase().trim(); });

                    productViewModel.BadIngredients = _.filter(ingredientNames, function (ingredient) {
                        return _.find(allergenNames, function (allergen) {
                            return ingredient.indexOf(allergen) > -1 && allergen !== "";
                        });
                    });

                    if (selectedAge === null) {
                        productViewModel.ShowAgeWarning = false;
                    }
                    else {
                        productViewModel.ShowAgeWarning = product.minimumAge >= selectedAge.maxAge || (product.minimumAge <= selectedAge.maxAge && product.minimumAge >= selectedAge.minAge);
                    }

                    return productViewModel;
                }

                if($scope.hasProfiles) {
                    angular.forEach($scope.profiles, function (profile) {
                        var allergenNamesForProfile = _.map(profile.allergens, function (x) { return x.name.toLowerCase().trim(); });
                        var age = _.find($scope.ageChoices, {'label': profile.age});
                        $scope.profileProductModels.push(makeProductViewModelInfo(allergenNamesForProfile, age || null, profile.pregnant==1, profile.profilename, profile));
                    });
                }
                else {
                    var allergenNames = _.map($scope.allergens, function (x) { return x.name.toLowerCase().trim(); });
                    $scope.profileProductModels.push(makeProductViewModelInfo(allergenNames, $scope.selectedAge.selected ? $scope.selectedAge.selected : null, $scope.nursingOrPregnant, "Info For You"));
                }
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
