/**
 * Created by tymfear on 25.06.2016.
 */
my_app.factory('posts', ['$http', 'Notification', function ($http, Notification) {
    var o = {
        posts: []
    };


    o.getAll = function () {
        return $http.get('/posts.json').success(function (data) {
            angular.copy(data, o.posts);
        });
    };

    o.get = function (id) {
        return $http.get('/posts/' + id + '.json').then(function (res) {
            return res.data;
        });
    };

    o.create = function (post) {
        return $http.post('/posts.json', post)
            .then(function (response) {
                o.posts.push(response.data);
                Notification.success({message: response.data.notice});
            }, function (response) {
                Notification.error({message: response.data.error});
            });
    };

    o.upvote = function (post) {
        return $http.put('/posts/' + post.id + '/upvote.json')
            .then(function(response){
                post.votes += 1;
                Notification.success({message: response.data.notice});
            }, function(response){
                Notification.error({message: response.data.error});
            });
    };

    o.addComment = function (id, comment) {
        return $http.post('/posts/' + id + '/comments.json', comment);
    };

    o.upvoteComment = function (post, comment) {
        return $http.put('/posts/' + post.id + '/comments/' + comment.id + '/upvote.json')
            .then(function (data) {
                comment.votes = data.data.votes;
            });
    };

    return o;
}]);
