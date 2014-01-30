'use strict';

angular.module('augeo')
    .factory('db', ['$rootScope', '$http', 'message', function($rootScope, $http, message) {

        var errorMessage = 'An error occurred.';

        function dbGet(url, broadcast) {

            var callback = function () {

                dbGet(url, broadcast);
            };

            var time = new Date().getTime();

            // check broadcast is valid
            if(typeof(broadcast) === 'undefined') {

                dbError(errorMessage);
                return;
            }

            $http.get(url + '?' + time).
                success(function (response, httpStatus, headers) {

                    if(headers('content-type') === 'application/json' && typeof(response.status) !== 'undefined') {

                        if(response.status === true) {

                            if(response.message.length) {

                                dbSuccess(response.message)
                            }
                            $rootScope.$broadcast(broadcast, response.data);

                        } else if(response.login === true) {

                            $rootScope.$broadcast('login', callback);

                        } else {

                            if(response.message.length) {

                                dbError(response.message);

                            } else {

                                dbError(errorMessage);
                            }
                            $rootScope.$broadcast(broadcast + 'Error');
                        }

                    } else {

                        dbError(errorMessage);
                        $rootScope.$broadcast(broadcast + 'Error');
                    }
                }).
                error(function ()  {

                    dbError(errorMessage);
                    $rootScope.$broadcast(broadcast + 'Error');
                });
        }

        function dbPost(url, data, broadcast) {

            var callback = function () {

                dbPost(url, data, broadcast);
            };

            // check broadcast is valid
            if(typeof(broadcast) === 'undefined') {

                dbError(errorMessage);
                return;
            }

            $http.post(url, {data: data}, {
                transformRequest: function (data) {return data != undefined ? $.param(data) : null;},
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).
                success(function (response, status, headers) {

                    if(headers('content-type') === 'application/json' && typeof(response.status) !== 'undefined') {

                        if(response.status === true) {

                            if(response.message.length) {

                                dbSuccess(response.message)
                            }
                            $rootScope.$broadcast(broadcast, response.data);

                        } else if (response.login === true) {

                            $rootScope.$broadcast('login', callback);

                        } else {

                            if(response.message.length) {

                                dbError(response.message);

                            } else {

                                dbError(errorMessage);
                            }
                            $rootScope.$broadcast(broadcast + 'Error');
                        }

                    } else {

                        dbError(errorMessage);
                        $rootScope.$broadcast(broadcast + 'Error');
                    }

                }).
                error(function () {

                    dbError(errorMessage);
                    $rootScope.$broadcast(broadcast + 'Error');
                });
        }

        function dbSuccess(successMessage) {

            message.success(successMessage);
        }

        function dbError(errorMessage) {

            message.error(errorMessage);
        }

        return {
            post: function (url, data, broadcast) {

                dbPost(url, data, broadcast);
            },
            get: function (url, broadcast) {

                dbGet(url, broadcast);
            },
            login: function (login, callbacks) {

                $rootScope.$broadcast('stopTimedRefresh');

                var data = ({data: login});

                $http.post('/Login', data, {
                    transformRequest: function (data) {return $.param(data);},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).
                    success(function (data, status, headers) {

                        if(headers('content-type') !== 'application/json') {

                            $rootScope.$broadcast('login', 'Could not log in.');

                        } else if (data.login) {

                            $rootScope.$broadcast('login', data.login);

                        } else {

                            $rootScope.$broadcast('loggedIn');

                            $.each(callbacks, function (k, callback) {

                                callback.call();
                            });
                        }

                    }).
                    error(function () {

                        $rootScope.$broadcast('login', 'Could not log in.');
                    });
            }
        };
    }]);
