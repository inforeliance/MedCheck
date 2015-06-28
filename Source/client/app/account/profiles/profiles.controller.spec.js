'use strict';

describe('Controller: ProfilesCtrl', function() {

    // load the controller's module
    beforeEach(module('medCheckApp'));

    var ProfilesCtrl,
        scope,
        $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('/api/users/me')
            .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

        scope = $rootScope.$new();
        ProfilesCtrl = $controller('ProfilesCtrl', {
            $scope: scope
        });
    }));

     it('profile should have a name', function () {
        expect(scope.frmProfile.length).toBe(1);
    });
});
