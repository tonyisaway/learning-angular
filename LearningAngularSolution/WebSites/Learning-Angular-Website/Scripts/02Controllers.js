(function () {

    var app = angular.module("githubViewer", []);

    var MainController = function (scope, http) {

        var person = {
            firstName: "Scott",
            lastName: "Allen",
            imageSrc: "http://odetocode.com/Images/scott_allen_2.jpg"
        };

        var onSuccessUserGet = function (response) {
            scope.user = response.data;
        }

        var onErrorUserGet = function (reason) {
            scope.error = "Could not fetch the user";
        }

        var url = "https://api.github.com/users/odetocode"

        var createErroring = false;
        if (createErroring) {
            url = "https://ap.github.com/users/odetocode";
        }

        http.get(url)
            .then(onSuccessUserGet, onErrorUserGet);

        scope.person = person;
        scope.message = "Hello from Angular";
    };

    app.controller("MainController", ["$scope", "$http", MainController]);

})();