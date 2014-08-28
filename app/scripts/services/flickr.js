'use strict';

angular.module('flickrSearchApp')
  .service('flickr', ['$rootScope','$http', function ($rootScope, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

		var options = {
			key : "b044f705296205f71f35f96c5273129d",
			secret : "9402706679edf869"
		};
        function flickrPull(search, page, broadcast) {

            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&' +
                'api_key=' + options.key + '&' +
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
