(function () {

    var app = angular.module("githubViewer", []);

    var MainController = function (scope,
        gitHub,
        interval,
        log,
        anchorScroll,
        location) {

        var onRepos = function (data) {
            scope.repos = data;
            location.hash("userDetails");
            anchorScroll();
        };

        var onSuccessUserGet = function (data) {
            scope.user = data;
            gitHub.getRepos(scope.user)
                .then(onRepos, onError);
        }

        var onError = function (reason) {
            scope.error = "Could not fetch the data.";
        }

        var decrementCountdown = function () {
            scope.countdown -= 1;
            if (scope.countdown < 1) {
                scope.search(scope.username);
            }
        };

        var countDownInterval = null;
        var startCountdown = function () {
            // interval is a function service
            countDownInterval = interval(decrementCountdown,
                1000,
                scope.countdown);
        };

        scope.search = function (username) {
            log.info("Searching for " + username);
            gitHub.getUser(username)
                .then(onSuccessUserGet, onError);

            if (countDownInterval) {
                interval.cancel(countDownInterval);
                scope.countdown = null;
            }
        };


        scope.message = "Github Viewer";
        scope.username = "angular";

        scope.repoSortOrder = "-stargazers_count";
        scope.countdown = 5;

        startCountdown();


    };

    app.controller("MainController",
        ["$scope", "gitHub", "$interval", "$log", "$anchorScroll", "$location",
            MainController]);

})();