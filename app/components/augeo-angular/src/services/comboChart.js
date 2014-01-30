'use strict';

angular.module('augeo')
	.factory('comboChart', ['$rootScope','$window', function ($scope, $window) {
		var comboContainer = $('#chart_div'),
			comboChartHolder;

		if (comboContainer.get(0) !== undefined) {

            comboChartHolder = new google.visualization.ComboChart(comboContainer.get(0));
		}

		function drawGauge(gauge, data, options) {

            var chartData = google.visualization.arrayToDataTable(data);

			if (gauge !== null) {

				gauge.draw(chartData, options);
			}
		}

		function setFullscreen() {

			$scope.width = $window.innerWidth - 200;
			$scope.height = $window.innerHeight - 200;
		}

		return {
			comboChart : function (results, options) {

				drawGauge(comboChartHolder, results, options);
			}

		};

	}]);