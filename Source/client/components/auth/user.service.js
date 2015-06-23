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
