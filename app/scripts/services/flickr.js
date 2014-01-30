'use strict';

angular.module('flickrtestApp')
  .service('flickr', ['$rootScope','$http', function flickr($rootScope, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

        function flickrPull(search, page, broadcast) {

            var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&' +
                'api_key=f039592bbc9ab803027c0e0f0b9475e2&' +
                'text=' + encodeURIComponent(search) + '&' +
                'per_page=20&page='+ page + '&' +
                'format=json&nojsoncallback=1&';


            $http.get(url).
                success(function (response, httpStatus, headers) {

                    if(response.stat == 'ok') {
                        $rootScope.$broadcast(broadcast, response.photos);
                    }
                })
                .error(function () {

                });
        }
        return {
            search : function (search, page, broadcast) {

                flickrPull(search, page, broadcast);
            }
        }
  }]);
