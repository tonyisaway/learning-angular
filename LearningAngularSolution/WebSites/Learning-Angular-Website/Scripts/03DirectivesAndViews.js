(function () {

    var app = angular.module("githubViewer", []);

    var MainController = function (scope, http) {

        var person = {
            firstName: "Scott",
            lastName: "Allen",
            imageSrc: "http://odetocode.com/Images/scott_allen_2.jpg"
        };

        var onRepos = function (response) {
            scope.repos = response.data;
        };

        var onSuccessUserGet = function (response) {
            scope.user = response.data;
            http.get(scope.user.repos_url)
                .then(onRepos, onError);
        }

        var onError = function (reason) {
            scope.error = "Could not fetch the data.";
        }

        scope.search = function (username) {
            var url = "https://api.github.com/users/" + username;
            http.get(url)
                .then(onSuccessUserGet, onError);
        };


        scope.person = person;
        scope.message = "Github Viewer";
        scope.username = "angular";

        scope.repoSortOrder = "-stargazers_count";


    };

    app.controller("MainController", ["$scope", "$http", MainController]);

})();