/**
 * Created by tymfear on 25.06.2016.
 */
my_app.controller('PostsCtrl', [
    '$scope',
    'posts',
    'post',
    function ($scope, posts, post) {

        $scope.post = post;

        $scope.addComment = function () {
            if ($scope.body === '') { return; }

            posts.addComment(post.id, {
                body: $scope.body,
                author: $scope.user
            }).success(function (comment) {
                $scope.post.comments.push(comment);
            });

            $scope.body = '';
        };

        $scope.incrementUpvotes = function(comment){
            posts.upvoteComment(post, comment);
        };
    }]);
