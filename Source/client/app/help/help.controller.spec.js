'use strict';

describe('Controller: HelpCtrl', function() {

    // load the controller's module
    beforeEach(module('medCheckApp'));

    var HelpCtrl,
        scope;
        //$httpBackend;
		
	// Initialize the controller and a mock scope
    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
        scope = $rootScope.$new();
        HelpCtrl = $controller('HelpCtrl', {
            $scope: scope
        });
    }));	


	it('should have a fire ticket function', function () {
        expect(scope.fireTicket).toBeDefined();
    });

    it('should have options the user can pick from', function () {
        expect(scope.options).toBeDefined();
    });
		
});
