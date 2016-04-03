'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:commentBox
 * @description
 * # commentBox
 */
angular.module('commentBox', ['commentList', 'commentForm'])
  .directive('commentBox', function ($http, timeElapseService) {
    return {
      template: '<div class="commentBox">' +
      '<h1>Comments</h1>' +
      '<comment-list comments="data" co="arr"></comment-list>' +
      '<comment-form></comment-form>' +
      '</div>',
      restrict: 'E',
      scope: {
        url: '@',
        pollInterval: '@'
      },
      link: function postLink(scope, element, attrs) {
        var loadCommentsFromServer = function () {
          $http.get(scope.url)
            .success(function (data, status, headers, config) {
              timeElapseService.HandleUI(data);
              scope.data = timeElapseService.scope.data;
              timeElapseService.sample();
            })
            .error(function (data, status, headers, config) {
              console.log(status);
            });
        };
        var handleCommentSubmit = function (event, data) {
          var comment = data;
          scope.data.concat([comment]);
          $http.post(scope.url, comment)
            .success(function (data, status, headers, config) {
              console.log('success')
            })
            .error(function (data, status, headers, config) {
              console.log(status);
            });
        };
        loadCommentsFromServer();
        setInterval(loadCommentsFromServer, scope.pollInterval);
        scope.$on('submitted', handleCommentSubmit);
      }
    }
  });
