(function() {
    'use strict';

    angular
        .module('psychicApp')
        .controller('peopleInfoController', peopleInfoController);

    peopleInfoController.$inject = ['$http', 'peopleInfoFactory', 'toastr']; 

    /* @ngInject */
    function peopleInfoController($http, peopleInfoFactory, toastr) {
        var vm = this; 
        vm.getInfo = getInfo;
        vm.age = "";
        vm.gender = "";
        vm.name = "";
        vm.showInfo = false; //flag that sets whether the message is displayed
        vm.showMessage = "";
        
        activate(); 

        ////////////

        function activate() {

        }

        // gets PIPL data for a specific phone number
       function getInfo (phoneNumber){

       		/*********************************************************
             bring this functionality back when want to use API again 
            **********************************************************/
            
            peopleInfoFactory.getInfoByPhoneNumber(phoneNumber).then( 
        		function(response) { 
            
            /**********************************************************/
            
                    /*************************************************************************************************************************************************************
                     bring this section back when want to disable hook to PIPL API (because it costs 5 to 40 cents per API query!) for testing purposes
                    *************************************************************************************************************************************************************
                    
                    vm.name = "Sarah Almquist";
                    vm.age = "";
                    vm.gender = "";
           
                    setTimeout(function(){
                      document.getElementById("showMessage").className = "center magictime spaceInDown";  
                    }, 0);   

                    if (vm.age === "" && vm.gender === ""){
                        vm.showMessage = vm.name + ", I'm finding it rather difficult to determine your gender orientation or age...";
                    } else if (vm.age === "") {
                        vm.showMessage = "I'm sure you are a " + vm.gender + ", but just how old ARE you, " + vm.name +"?";
                    } else if (vm.gender === ""){
                        vm.showMessage = "Your name is " + vm.name + " and you are " + vm.age + " years old, but don't you think it's about time you picked a gender oreintation?";
                    } else {
                        vm.showMessage = "Your name is " + vm.name + " and you are a " + vm.age + " year old " + vm.gender;
                    }

                    vm.showInfo = true;
                    
                    setTimeout(function(){
                      document.getElementById("showMessage").className = "center animated fadeOut";  
                    }, 4000);

                    ****************************************************************************************************************************************************************/



                    /****************************************************************************************************************************************************************
                     Bring this section back in when want the API functionality back
                     ****************************************************************************************************************************************************************/

                    // ensures message to be displayed is hidden while we check to see what we get back from PIPL
                    vm.showInfo = false;

                    // ensures message to be displayed is centered and is animated with magictime's spaceInDown animation
                    setTimeout(function(){
                      document.getElementById("showMessage").className = "center magictime spaceInDown";  
                    }, 0);  
                    
                    //if there is no name in the database, then display a custom message 
                    if (response.data.person === undefined){
                        vm.showMessage = "Do you even exist?? I can't seem to find any information about you...";
                        vm.showInfo = true;
                        setTimeout(function(){
                          document.getElementById("showMessage").className = "center animated fadeOut";  
                        }, 4000);
                        return;
                    }

                    // if there is no age or gender found in the pipl database, then display a custom message
                    if ((response.data.person.dob === undefined) && (response.data.person.gender === undefined)){
                        vm.name = response.data.person.names[0].display;
                        vm.showMessage = vm.name + ", I'm finding it rather difficult to determine your gender orientation or age...";
                    }

                    // if there is no age found in the pipl database, then display a custom message
                    else if (response.data.person.dob === undefined) {
                        vm.gender = response.data.person.gender.content;
                        vm.name = response.data.person.names[0].display;
                        vm.showMessage = "I'm sure you are a " + vm.gender + ", but just how old ARE you, " + vm.name +"?";
                  
                    //if there is no gender in the pipl database, then display a custom message
                    } else if (response.data.person.gender === undefined){
                        vm.name = response.data.person.names[0].display;
                        vm.age = response.data.person.dob.display;
                        vm.showMessage = "Your name is " + vm.name + " and you are " + vm.age + " , but don't you think it's about time you picked a gender oreintation?";

                    } else {
                        vm.name = response.data.person.names[0].display;
                        vm.age = response.data.person.dob.display;
                        vm.gender = response.data.person.gender.content;
                        vm.showMessage = "Your name is " + vm.name + " and you are a " + vm.age + " " + vm.gender;  
                    }

                    vm.showInfo = true;

                    setTimeout(function(){
                      document.getElementById("showMessage").className = "center animated fadeOut";  
                    }, 4000);
            
                },

                /**********************************************************************************
                 Bring this stuff back in when want the API functionality back
                **********************************************************************************/
        		function(error){ //creates toastr error messages based on PIPL API error messages
        			vm.showInfo = false;
                    toastr.error('There was an error');               
			     }
            );
                /**********************************************************************************/
        }
    }
})();

/* 6197190679
4802206730
7147947188*/