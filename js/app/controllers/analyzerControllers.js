/**
 * Created by robert.chapman on 9/10/15.
 */

angular.module('analyzerControllersModule', [])

    .controller('WebSocketAnalyzerController', function ($scope) {

        var port;

        $scope.socketRequests = [];

        $scope.clearRequests = function () {

            $scope.socketRequests = [];
        };

        function init() {

            createBackgroundPort();
            registerBackgroundEventHandler();
        }

        function createBackgroundPort() {

            port = chrome.runtime.connect({name: "SocketConnectionId"});
        }

        function registerBackgroundEventHandler() {

            if (!port) {
                createBackgroundPort();
            }
            port.onMessage.addListener(function (msg) {

                //$scope.name = msg;
                $scope.socketRequests.push({name: msg});
                /* We are outside the context of angular in this context. With that said, an apply is required */
                $scope.$apply();
            });
        }

        init();
    });
