(function () {
    
    var ProductModel = function (apiobject) {
        console.log(apiobject);
        this.BrandName = apiobject.openfda.brand_name ? apiobject.openfda.brand_name[0] : "(N/A)";
        this.Purpose = apiobject.purpose ? apiobject.purpose[0].replace("Purpose ", "") : "";
        this.Pregnancy = apiobject.pregnancy_or_breast_feeding ? apiobject.pregnancy_or_breast_feeding[0] : "";
        
        if (this.Pregnancy === "" && apiobject.pregnancy) {
            this.Pregnancy = apiobject.pregnancy[0];
        }

        this.SafeForPregnancy = this.Pregnancy === "";
        this.Ingredients = [];
        this.MinimumAge = 100;
        this.MinimumAgeInfo = "";
        
        var dosageInfo = apiobject.dosage_and_administration.toString() + "";
        
        var match = dosageInfo.match(/(?:children )?under\s+(?:age )?(\d+):?\s*:\s*?do not/i);       
        if (match) {
            this.MinimumAge = match[1];
            this.MinimumAgeInfo = "Not recommended for anyone under: " + match[1];
        }
        else if (match = dosageInfo.match(/(?:children )?under ?(\d+) (years)?:?\s*:?\s*?do not/i)) {
            this.MinimumAge = match[1];
            this.MinimumAgeInfo = "Not recommended for anyone under: " + match[1];
        }
        else if ((match = dosageInfo.match(/(?:children )?under\s+(\d+)((\s+old)|(\s+years)|(\s+years of age)):?\s*do/i))) {
            this.MinimumAge = match[1];
            this.MinimumAgeInfo = "Not recommended for anyone under: " + match[1];
        }
        else if (match = dosageInfo.match(/(?:children )?under\s+(?:age )?(\d+):?\s*:\s*?[^.]+doctor\./i)) {
            this.MinimumAge = match[1];
            this.MinimumAgeInfo = "Consult a doctor for anyone under: " + match[1];
        }
        else if ((match = dosageInfo.match(/(?:children )?under\s+(\d+)((\s+old)|(\s+years)|(\s+years of age)):?\s*/i)) && dosageInfo.match(/doctor/i)) {
            this.MinimumAge = match[1];
            this.MinimumAgeInfo = "Consult a doctor for anyone under: " + match[1];
        }      
        else if ((match = dosageInfo.match(/(?:children )?under\s+(\d+)((old)|(\s+years of age)):?\s*/i)) && dosageInfo.match(/supervised/i)) {
            this.MinimumAge = match[1];
            this.MinimumAgeInfo = "Adult supervision for anyone under: " + match[1];
        }
        else if ((match = dosageInfo.match(/adults and children (\d+)/i))) {
            this.MinimumAge = match[1];
            this.MinimumAgeInfo = "Not recommended for anyone under: " + match[1];
        }
        else if (!dosageInfo.match(/children|pediatric/i) && dosageInfo.match(/adults/i)) {
            this.MinimumAgeInfo = "Not recommended for children";
        }      
        else {
            this.MinimumAgeInfo = "Everyone";
        }

        if (apiobject.inactive_ingredient) {
            //massage the inactive ingredient string
            var re = /^((inactive\s+)?ingredient[:s]*\s*)+/i;
            var newResult = apiobject.inactive_ingredient[0].replace(re, "");
            newResult = newResult.replace(/Free from.+?\./g, "");
            var ingredientList = newResult.split(/[,•]/);
            
            for (var i = 0; i < ingredientList.length; i++) {
                this.Ingredients.push({
                    Name: ingredientList[i].trim().toLowerCase(),
                    Active: false
                });
            }
        }
        
        angular.forEach(apiobject.openfda.substance_name, function (value) {
            this.push({
                Name: value.toLowerCase(),
                Active: true
            });
        }, this.Ingredients);       
        
    };
    
    var openFDAService = function ($http, $q) {
        function findByBrandName(brandName) {
            var def = $q.defer();
            
            $http.get("https://api.fda.gov/drug/label.json?search=brand_name:" + brandName + "&limit=50")
        .then(
                function (resp) {
                    var products = [];
                    for (var i = 0; i < resp.data.results.length; i++) {
                        products.push(new ProductModel(resp.data.results[i]));
                    }
                    def.resolve(products);
                },
                function (resp) {
                    if (resp.data.error && resp.data.error.code == "NOT_FOUND") {
                        def.reject({
                            not_found: true,
                            resp: resp
                        });
                    } else {
                        def.reject({
                            not_found: false,
                            resp: resp
                        });
                    }
                });
            
            return def.promise;
        }
        
        function findByUPC(upc) {
            var def = $q.defer();
            
            $http.get("https://api.fda.gov/drug/label.json?search=upc:" + upc + "&limit=1").then(
                function (resp) {
                    def.resolve(new ProductModel(resp.data.results[0]));
                },
                        function (resp) {
                    if (resp.data.error && resp.data.error.code == "NOT_FOUND") {
                        def.reject({
                            not_found: true,
                            resp: resp
                        });
                    } 
                    else {
                        def.reject({
                            not_found: false,
                            resp: resp
                        });
                    }
                });
            
            return def.promise;
        }
        
        function findIngredient(ingredient) {
            var def = $q.defer();
            
            $http.get("https://api.fda.gov/drug/label.json?search=inactive_ingredient:" + ingredient + "&limit=1").then(
                function (resp) {
                    def.resolve({
                        not_found: false,
                        ingredient: ingredient,
                        resp: resp,
                        hasError: false
                    });
                },
                function (resp) {
                    if (resp.data.error && resp.data.error.code == "NOT_FOUND") {
                        def.reject({
                            not_found: true,
                            ingredient: ingredient,
                            resp: resp
                        });
                    } else {
                        def.reject({
                            not_found: false,
                            ingredient: ingredient,
                            resp: resp,
                            hasError: true
                        });
                    }
                });
            
            return def.promise;
        }
        
        return {
            findByUPC: findByUPC,
            findByBrandName: findByBrandName,
            findIngredient : findIngredient
        }
    };
    
    angular.module("medCheckApp").factory("openFDA", ["$http", "$q", openFDAService])

    
    //http://stackoverflow.com/questions/18888104/angularjs-q-wait-for-all-even-when-1-rejected
    angular.module('medCheckApp').config(['$provide', function ($provide) {
            $provide.decorator('$q', ['$delegate', function ($delegate) {
                    var $q = $delegate;
                    
                    // Extention for q
                    $q.allSettled = $q.allSettled || function (promises) {
                        var deferred = $q.defer();
                        if (angular.isArray(promises)) {
                            var states = [];
                            var results = [];
                            var didAPromiseFail = false;
                            
                            // First create an array for all promises with their state
                            angular.forEach(promises, function (promise, key) {
                                states[key] = false;
                            });
                            
                            // Helper to check if all states are finished
                            var checkStates = function (states, results, deferred, failed) {
                                var allFinished = true;
                                angular.forEach(states, function (state, key) {
                                    if (!state) {
                                        allFinished = false;
                                    }
                                });
                                if (allFinished) {
                                    if (failed) {
                                        deferred.reject(results);
                                    } else {
                                        deferred.resolve(results);
                                    }
                                }
                            }
                            
                            // Loop through the promises
                            // a second loop to be sure that checkStates is called when all states are set to false first
                            angular.forEach(promises, function (promise, key) {
                                $q.when(promise).then(function (result) {
                                    states[key] = true;
                                    results[key] = result;
                                    checkStates(states, results, deferred, didAPromiseFail);
                                }, function (reason) {
                                    states[key] = true;
                                    results[key] = reason;
                                    didAPromiseFail = true;
                                    checkStates(states, results, deferred, didAPromiseFail);
                                });
                            });
                        } else {
                            throw 'allSettled can only handle an array of promises (for now)';
                        }
                        
                        return deferred.promise;
                    };
                    
                    return $q;
                }]);
        }]);
})();

