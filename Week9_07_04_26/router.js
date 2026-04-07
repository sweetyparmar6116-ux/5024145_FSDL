app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
    .when("/", {
        templateUrl: "views/home.html",
        controller: "myController"
    })
    .when("/about", {
        templateUrl: "views/about.html"
    })
    .otherwise({
        redirectTo: "/"
    });

});