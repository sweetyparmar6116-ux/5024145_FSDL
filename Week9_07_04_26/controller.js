app.controller("myController", function($scope) {

    $scope.appTitle = "AngularJS Hello World App";
    $scope.appSubtitle = "A simple project using ng-controller, ng-model, and expressions.";

    $scope.name = "World";
    $scope.counter = 0;
    $scope.newItem = "";

    $scope.changeMessage = function() {
        $scope.name = "AngularJS";
    };

    $scope.increment = function() {
        $scope.counter += 1;
    };

    $scope.items = ["Hello", "Welcome", "AngularJS"];

    $scope.addItem = function() {
        if ($scope.newItem) {
            $scope.items.push($scope.newItem);
            $scope.newItem = "";
        }
    };

});