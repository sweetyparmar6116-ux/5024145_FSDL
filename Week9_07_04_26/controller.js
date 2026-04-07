app.controller("myController", function($scope) {

    $scope.name = "World";

    $scope.changeMessage = function() {
        $scope.name = "AngularJS";
    };

    $scope.items = ["Hello", "Welcome", "AngularJS"];

});