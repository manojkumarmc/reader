
myApp.factory('socket',['$rootScope', function($rootScope) {
//	var socket = io.connect();

        var socket = io.connect('http://localhost:3000',  {
                      'reconnect': true,
                      'reconnection delay': 500,
                      'max reconnection attempts': 10
                    })
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
				        console.log('inside')
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
}]);
