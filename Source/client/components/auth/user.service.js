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
     dropProfile: {
        method: 'PATCH',
        params: {
          controller:'dropprofiles'
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
    return $resource('/api/profile/:id/:controller', {
       id: '@_id'
    },
    {     
      dropAllergen: {
        method: 'PATCH',
        params: {
          controller:'dropallergen'
        }
      },  
      addAllergen: {
        method: 'PATCH',
        params: {
          controller:'addallergen'
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
  .factory('Allergen', function ($resource) {
    return $resource('/api/allergen/:id/:controller', {
      id: '@_id' 
	  });
  });

