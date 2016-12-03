(function () {

    var gitHub = function (http) {

        var getUser = function (username) {
            // http is object api service
            return http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    return response.data;
                });
        };

        var getRepos = function (user) {
            // http is object api service
            return http.get(user.repos_url)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getUser: getUser,
            getRepos : getRepos
        };
    };

    var module = angular.module("githubViewer");
    module.factory("gitHub", ["$http", gitHub]);
})();