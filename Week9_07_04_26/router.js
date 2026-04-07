app.config(function($routeProvider) {

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