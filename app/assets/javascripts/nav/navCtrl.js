/**
 * Created by tymfear on 25.06.2016.
 */
my_app.controller('NavCtrl', [
    '$scope',
    'Auth',
    function ($scope, Auth) {
        $scope.signedIn = Auth.isAuthenticated;
        $scope.logout = Auth.logout;

        Auth.currentUser().then(function (user) {
            $scope.user = user;
        });

        $scope.$on('devise:new-registration', function (e, user) {
            $scope.user = user;
        });

        $scope.$on('devise:login', function (e, user) {
            $scope.user = user;
        });

        $scope.$on('devise:logout', function (e, user) {
            $scope.user = {};
        });
    }]);
