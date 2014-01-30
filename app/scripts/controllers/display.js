'use strict';

angular.module('flickrSearchApp')
    .controller('displayCtrl', ['$scope', 'flickr', function ($scope, flickr) {

        $scope.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        $scope.page = 1;

        $scope.search = function () {

            $scope.page = 1;
            pullImages();

        }

        var pullImages = function () {

            $scope.images   = null;
            $scope.loading  = 'loading';
            flickr.search($scope.searchTerm, $scope.page, 'imagesLoaded');
        }

        $scope.$on('imagesLoaded', function (event, data) {

            $scope.loading  = 'loaded';
            $scope.page     = data.page;
            $scope.images   = data.photo;
        });

        $scope.setOverlay = function (index) {

            $scope.image = index;

        }

        $scope.setPage = function (page) {

            $scope.page = page;
            pullImages();
        }
    }]);
