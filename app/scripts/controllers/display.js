'use strict';

angular.module('flickrSearchApp')
    .controller('displayCtrl', ['$scope', 'flickr', function ($scope, flickr) {

        /** View model*/
        var vm = this;

        /**
         * View variables
         */
        vm.pages      = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        vm.page       = flickr.page;
        vm.searchTerm = '';
        vm.image      = null;
        vm.images     = flickr.images;
        vm.loading    = flickr.loading;

        /**
         * View functions
         */
        vm.search     = search;
        vm.setPage    = setPage;
        vm.setOverlay = setOverlay;

        function search() {

            flickr.search(vm.searchTerm);
        }

        function setPage(page) {

            vm.page = page;
            search();
        }



        function setOverlay (index) {

            vm.image = index;

        }
    }]);
