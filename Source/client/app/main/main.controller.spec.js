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
        scope.UPCChanged();
        expect(scope.ShowBrandNotFoundErrorMessage).not.toBe(true);
        expect(scope.ShowNotFoundErroMessage).not.toBe(true);
        scope.BrandChanged();
        expect(scope.ShowBrandNotFoundErrorMessage).not.toBe(true);
        expect(scope.ShowNotFoundErroMessage).not.toBe(true);
    });

    it('should find products', function() {
        scope.UPCChanged();
        scope.UPC = "0075609000935";
        scope.scanBarCode().then(function() {
            expect(scope.ShowNotFoundErrorMessage).not.toBe(true);
        });
    });

    it('should not find products', function() {
        scope.UPCChanged()
        scope.UPC = "nonexistent product";
        scope.scanBarCode().then(function() {
            expect(scope.ShowNotFoundErrorMessage).toBe(true);
        });
    });
});
