(function () {
    
    var ProductModel = function (apiobject) {
        console.log(apiobject);
        this.BrandName = apiobject.openfda.brand_name[0];
        this.Purpose = apiobject.purpose ? apiobject.purpose[0].replace("Purpose ", "") : "";
        this.Pregnancy = apiobject.pregnancy_or_breast_feeding ? apiobject.pregnancy_or_breast_feeding[0] : "";
        this.SafeForPregnancy = this.Pregnancy === "";
        this.Ingredients = [];
        
        if (apiobject.inactive_ingredient) {
            //massage the inactive ingredient string
            var re = /^((inactive\s+)?ingredient[:s]*\s*)+/i;
            var newResult = apiobject.inactive_ingredient[0].replace(re, "");
            newResult = newResult.replace(/Free from.+?\./g, "FREE FROM THESE THINGS");
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
            
            $http.get("https://api.fda.gov/drug/label.json?search=upc:" + upc + "&limit=1")
        .then(
                function (resp) {
                    def.resolve(new ProductModel(resp.data.results[0]));
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
        
        function findIngredient(ingredient) {
            var def = $q.defer();
            
            $http.get("https://api.fda.gov/drug/label.json?search=inactive_ingredient:" + ingredient + "&limit=1")
        .then(
                function (resp) {
                    def.resolve(new ProductModel(resp.data.results[0]));
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
        
        return {
            findByUPC: findByUPC,
            findByBrandName: findByBrandName
        }
    };
    
    angular.module("medCheckApp").factory("openFDA", ["$http", "$q", openFDAService])

})();
