myApp.controller('MyCtrl', ['$scope', 'socket', function($scope, socket) {

    $scope.books = []

    $scope.clickMe = function(data) {
	console.log('clicked on ' + data)
	socket.emit('clickMe', data)
    }

    socket.on('respond', function(data) {
//	console.log(data)
	data.forEach(function(book) {
	    $scope.books.push(book)
	})
    })


}])
