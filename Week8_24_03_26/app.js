var app = angular.module("studentApp", []);

app.controller("studentController", function($scope) {

    $scope.students = [];

    // Add Student
    $scope.addStudent = function() {
        if ($scope.studentForm.$valid) {
            $scope.students.push({
                name: $scope.student.name,
                email: $scope.student.email,
                age: $scope.student.age
            });

            // Reset form
            $scope.student = {};
            $scope.studentForm.$setPristine();
            $scope.studentForm.$setUntouched();
        }
    };

    // Delete Student
    $scope.deleteStudent = function(index) {
        $scope.students.splice(index, 1);
    };

});