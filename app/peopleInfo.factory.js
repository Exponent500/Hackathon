(function() {
    'use strict';

    angular
        .module('psychicApp')
        .factory('peopleInfoFactory', peopleInfoFactory);

    peopleInfoFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function peopleInfoFactory($http, $q) { 
        var service = { 
            getInfoByPhoneNumber: getInfoByPhoneNumber
        };
        return service;

        //pulls weather info from OpenWeatherMAP API, based on city name
        function getInfoByPhoneNumber(phoneNumber) {
            
        	var defer = $q.defer(); 

         $http({
        		method: 'GET',
        		url: 'https://api.pipl.com/search/?',
                params: {
                     phone: phoneNumber,                  
                    /* DEMO KEYS */
                    
                    //key: 'lj67bvx9vx8wcbk0fcjly9r2' // CONTACT-PREMIUM-DEMO
                    //key: 'harquv9crf4kot9aser7oxwp' // CONTACT-DEMO
                    //key: '6u9lx6vetym0bgvnggu9h9pz' // SOCIAL-PREMIUM-DEMO
                    //key: 'qzr8hb0gwlvxv31cke2dcqnq' // SOCIAL-DEMO
                    //key: 'i8gpu9pfa2ey7dqrzlpecmag' // BUSINESS-PREMIUM-DEMO
                    //key: '1ijeqygx888x5ree77pn17su' // BUSINESS-DEMO

                    /*PAID KEYS */
                    
                    key: '8idp5zkwwkstkkki7ku1e4ji' // CONTACT-PREMIUM
                    //key: 'rq6r979ie2imrl0mj4kxwxq9' // CONTACT
                    //key: 'bbkz5f1plazw6pgl3l3pqpxv' // SOCIAL-PREMIUM
                    //key: 'y2v5p32q3czr5y1o3we2rwhh' // SOCIAL
                    //key: '1vvzksznm3lnbabybb8byyh4' // BUSINESS-PREMIUM
                    //key: 'izavjialdey2b1nrwjhk9inc' // BUSINESS
                }
        })
        	.then(function(response){ 
                //checks if the response from PIPL API is an object. If yes, provide the object to the controller. If no, provide the controller with a reason why.
    			if(typeof response.data === 'object'){ 
    				defer.resolve(response); //response goes to the response path of the controller
    			} else {
    				defer.reject(response); // rejects go to the error path in the controller. This handles an error condition that would not be thrown by the webserver. In other words an error condition we want to catch.
    			}
			},
			function(error){ //additional function for the error path. This would handle an error that was generated from the webserver
        		defer.reject(error);
        		
			});

			return defer.promise; //return the defer object promise with or without the reject or resolve
        	  
        }
    }
})();