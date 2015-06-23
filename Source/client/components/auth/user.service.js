'use strict';

angular.module('medCheckApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      update: {
        method: 'PATCH'
      },
      addProfile: {
        method: 'PATCH',
        params: {
          controller:'profiles'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
  
angular.module('medCheckApp')
  .factory('Profile', function ($resource) {
    return $resource('/api/profiles/:id/:controller', {
      id: '@_id'
    });
  });
  
 angular.module('medCheckApp')
  .factory('Allergen', function ($resource) {
    return $resource('/api/allergens/:id/:controller', {
      id: '@_id'
    });
  });

