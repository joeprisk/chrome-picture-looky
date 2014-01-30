'use strict';

angular.module('augeo')
    .factory('message', ['$timeout', function($timeout) {

        var alertRunning = false,
            alerts       = [],
            delay        = 75,
            fadeTime     = 'fast';

        function alertTime(message) {

            return message.length * delay;
        }

        function addAlert(message, status) {

            if(message) {

                if(!alertRunning) {

                    alerts.push({message: message, status: status});
                    processAlerts();

                } else {

                    alerts.push({message: message, status: status});
                }
            }
        }

        function processAlerts($alert) {

            var $messages = $('.messages');

            if(typeof($alert) !== 'undefined') {

                $alert.slideUp(fadeTime, function () { this.remove(); });
            }

            if(alerts.length) {

                var nextAlert = alerts.pop(),
                    div =
                        '<div class="alert alert-' + nextAlert.status + ' col-md-6 col-md-push-3">' +
                        nextAlert.message +
                        '</div>',
                    button = '<button class="close">&times;</button>',
                    $div = $(div).hide(),
                    $button = $(button),
                    timer;

                    $div.prepend($button);

                alertRunning = true;

                $messages.append($div);

                $div.slideDown(fadeTime);

                timer = $timeout(function () {

                    processAlerts($div);

                }, alertTime(nextAlert.message));

                $button.click(function () {

                    $timeout.cancel(timer);
                    processAlerts($div);
                });

            } else {

                alertRunning = false;
            }
        }

    return {
        error: function (message) {

            if(typeof(message) !== 'undefined') {

                message = 'Error: ' + message;
            }

            return addAlert(message, 'danger');
        },
        success: function (message) {

            return addAlert(message, 'success');
        },
        info: function (message) {

            return addAlert(message, 'info');
        }
    };
}]);
