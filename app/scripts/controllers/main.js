'use strict';

/**
 * @ngdoc function
 * @name dockerHubWebHooksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dockerHubWebHooksApp
 */
angular.module('dockerHubWebHooksApp')
  .controller('MainCtrl', function (NgTableParams, $http) {
  var self = this;
  $http({
        method: 'GET',
        url: '/log'
        }).then(function successCallback(response) {
          var dataset = [{ name: 'christian', age: 21 }, { name: 'anthony', age: 88 }];
          console.log('repsonse:' + JSON.stringify(response.data));
          self.testData = [response.data];
          self.tableParams = new NgTableParams({ count: 5 });
          self.tableParams.settings({ data: response.data});



        /*  self.tableParams = new NgTableParams({}, {
                getData: function(params) {
                   return dataset;
                }
              });*/




  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.error(response);
  });


  });
