my_app = angular.module('flapperNews', ['ui.router', 'templates', 'Devise', 'ui-notification']);

my_app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/_home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function (posts) {
                        return posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: 'posts/_posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function ($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'auth/_login.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'Auth', function($state, Auth) {
                    Auth.currentUser().then(function (){
                        $state.go('home');
                    })
                }]
            })
            .state('register', {
                url: '/register',
                templateUrl: 'auth/_register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'Auth', function($state, Auth) {
                    Auth.currentUser().then(function (){
                        $state.go('home');
                    })
                }]
            });


        $urlRouterProvider.otherwise('/');
    }]);

my_app.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'bottom'
    });
});
