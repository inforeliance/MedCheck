'use strict';

angular.module('httpReal', ['ng'])
    .config(['$provide', function($provide) {
        $provide.decorator('$httpBackend', function() {
            return angular.injector(['ng']).get('$httpBackend');
        });
    }])
    .service('httpReal', ['$rootScope', function($rootScope) {
        this.submit = function() {
            $rootScope.$digest();
        };
    }]);

describe('Controller: MainCtrl', function() {
    // load the controller's module
    beforeEach(module('medCheckApp','httpReal'));

    var MainCtrl,
        scope,
        httpReal;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _httpReal_) {

        httpReal = _httpReal_;

        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));
    
    it('should not show an error message when a field is changed', function() {
        scope.SearchChanged();
        expect(scope.ShowBrandNotFoundErrorMessage).not.toBe(true);
        expect(scope.ShowNotFoundErroMessage).not.toBe(true);
        scope.BrandChanged();
        expect(scope.ShowBrandNotFoundErrorMessage).not.toBe(true);
        expect(scope.ShowNotFoundErroMessage).not.toBe(true);
    });

    it('should find a product with a valid UPC', function(done) {
        scope.SearchChanged();
        scope.SearchValue = "0075609000935";
        scope.scanBarCode().then(function() {
            expect(scope.ShowNotFoundErrorMessage).not.toBe(true);
            done();
        }, function(error){
            expect(false).toBeTruthy();
            done();
        });
        httpReal.submit();
    });

    it('should find a product with a valid brand name', function(done) {
        scope.SearchChanged();
        scope.SearchValue = "advil";
        scope.findBrand().then(function() {
            expect(scope.BrandProductModels.length).not.toBe(0);
            done();
        }, function(error){
            expect(false).toBeTruthy();
            done();
        });
        httpReal.submit();
    });
    
    it('should set the active product when a valid upc is passed', function (done) {
        scope.SearchChanged();
        scope.SearchValue = "0075609000935";
        expect(scope.profileProductModels.length).toBe(0);
        scope.scanBarCode().then(function () {
            expect(scope.profileProductModels.length).toBe(1);
            done();
        }, function(error){
            expect(false).toBeTruthy();
            done();
        });
        httpReal.submit();
    });

    it('should not find products when an invalid upc is passed', function(done) {
        scope.SearchChanged();
        scope.SearchValue = "0075609000936"; //non existent UPC
        expect(scope.profileProductModels.length).toBe(0);
        scope.scanBarCode().then(function() {
            expect(scope.ShowNotFoundErrorMessage).toBe(true);
            expect(scope.profileProductModels.length).toBe(0);
            done();
        }, function(error){
            expect(false).toBeTruthy();
            done();
        });
        httpReal.submit();
    });

    it('should start with 1 allergen', function (done) {
        expect(scope.allergens.length).toBe(1);
        done();
    });

    it('should reset the default allergen when removing the last one', function () {
        scope.allergens[0].name = "Hello";
        scope.removeAllergen(scope.allergens[0]);
        expect(scope.allergens.length).toBe(1);
        expect(scope.allergens[0].name).toBe("");
    });

    it('should remove an allergen if there are more than one', function () {
        
        scope.addAllergen();
        expect(scope.allergens.length).toBe(2);
        scope.removeAllergen(scope.allergens[0]);
        expect(scope.allergens.length).toBe(1);
    });
});
