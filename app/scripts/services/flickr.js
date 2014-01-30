'use strict';

angular.module('flickrSearchApp')
  .service('flickr', ['$rootScope','$http', function ($rootScope, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

        function flickrPull(search, page, broadcast) {

            var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&' +
                'api_key=9ca70fb67b982023dfe10397e3afc625&' +
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
