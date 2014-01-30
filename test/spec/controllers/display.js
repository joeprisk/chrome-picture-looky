'use strict';

describe('Controller: displayCtrl', function () {

    // load the controller's module
    beforeEach(module('flickrSearchApp'));

    var displayCtrl,
        mockFlickr,
        scope;

    beforeEach(function () {

        mockFlickr = {
            search: jasmine.createSpy('mockFlickr.search')
        };

    });

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {

        scope = $rootScope.$new();

        displayCtrl = $controller(
            'displayCtrl', {
                $scope: scope,
                flickr: mockFlickr
            });

        scope.$apply();
    }));

    describe('initialisation of displatCtrl', function() {

        it('should attach a list of awesomeThings to the scope', function () {

            expect(scope.pages.length).toBe(10);
            expect(scope.page).toBe(1);

        });

    });

    describe('$scope.search = function()', function() {

        it('Should do some search with undefined', function() {

            scope.search();
            expect(mockFlickr.search).toHaveBeenCalledWith(undefined, 1, 'imagesLoaded')

        });

        it('should do a search with search term', function() {
            scope.page = 123;
            scope.searchTerm = 'kittens';
            scope.search();
            expect(mockFlickr.search).toHaveBeenCalledWith('kittens', 1, 'imagesLoaded')
        })
    });

    describe('$scope.setPage = function(page)', function() {

        it('Should set the page and do some search', function() {

            scope.searchTerm = 'searchTerm'

            scope.setPage(10);

            expect(scope.loading).toBe('loading');
            expect(scope.images).toBeNull();
            expect(mockFlickr.search).toHaveBeenCalledWith('searchTerm', 10, 'imagesLoaded')

        });
    });


    describe('$scope.setOverlay = function()', function() {

        it('Should do some search', function() {

            scope.setOverlay(123);
            expect(scope.image).toBe(123)
        });
    });

    describe('$scope.$on(\'imagesLoaded\')', function() {

        it('should receive images from flickr', function() {

            var data = {page:123, photo:['test','data']};
            scope.$emit('imagesLoaded', data);

            expect(scope.images).toEqual(['test','data']);
            expect(scope.page).toBe(123)

        });
    })


});
