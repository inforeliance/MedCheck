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

    it('should attach a list of things to the scope', function() {
        $httpBackend.flush();
        expect(scope.awesomeThings.length).toBe(4);
    });

    it('should not show an error message when a field is changed', function() {
        scope.UPCChanged();
        expect(scope.ShowBrandNotFoundErrorMessage).toBe(false);
        expect(scope.ShowNotFoundErroMessage).toBe(false);
        scope.BrandChanged();
        expect(scope.ShowBrandNotFoundErrorMessage).toBe(false);
        expect(scope.ShowNotFoundErroMessage).toBe(false);
    });

    it('should find products', function() {
        scope.UPCChanged();
        scope.UPC = "0075609000935";
        scope.scanBarCode();
        expect(scope.ShowNotFoundErrorMessage).toBe(false);
    });

    it('should not find products', function() {
        scope.UPCChanged();
        scope.UPC = "nonexistent product";
        scope.scanBarCode();
        expect(scope.ShowNotFoundErrorMessage).toBe(true);
    });
});
