'use strict';

/**
 * @ngdoc overview
 * @name dockerHubWebHooksApp
 * @description
 * # dockerHubWebHooksApp
 *
 * Main module of the application.
 */
angular
  .module('dockerHubWebHooksApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngTable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
