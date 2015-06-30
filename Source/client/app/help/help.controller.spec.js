'use strict';

describe('Controller: HelpCtrl', function() {

    // load the controller's module
    beforeEach(module('medCheckApp'));

    var HelpCtrl,
        scope
        //$httpBackend;
		
	// Initialize the controller and a mock scope
    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
        //$httpBackend = _$httpBackend_;
        //$httpBackend.expectGET('/api/things')
        //    .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

        scope = $rootScope.$new();
        HelpCtrl = $controller('HelpCtrl', {
            $scope: scope
        });
    }));	
		
	it('should have a message body', function () {
		scope.fireTicket();
        expect(scope.help.issue.length).toBe(1);
    });
		
});