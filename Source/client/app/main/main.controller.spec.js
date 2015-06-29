'use strict';

describe('Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module('medCheckApp'));

    var MainCtrl,
        scope,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/api/things')
            .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

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

    it('should find products', function() {
        scope.SearchChanged();
        scope.UPC = "0075609000935";
        scope.scanBarCode().then(function() {
            expect(scope.ShowNotFoundErrorMessage).not.toBe(true);
        });
    });
    
    it('should set the active product when a valid upc is passed', function () {
        scope.SearchChanged();
        scope.UPC = "0075609000935";
        expect(scope.ProductModel).toBe(null);
        scope.scanBarCode().then(function () {
            expect(scope.ProductModel).not.toBe(null);
        });
    });

    it('should not find products', function() {
        scope.SearchChanged()
        scope.UPC = "nonexistent product";
        scope.scanBarCode().then(function() {
            expect(scope.ShowNotFoundErrorMessage).toBe(true);
        });
    });

    it('should start with 1 allergen', function () {
        expect(scope.allergens.length).toBe(1);
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
