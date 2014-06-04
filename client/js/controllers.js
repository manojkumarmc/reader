myApp.controller('MyCtrl', ['$scope', '$sce',  'socket', function($scope, $sce,  socket) {

    $scope.pages = []
    $scope.pageText = ''

    $scope.clickMe = function(data) {
	console.log('clicked on ' + data)
	socket.emit('clickMe', data)
    }

    socket.on('respond', function(data) {
	data.forEach(function(page) {
	    $scope.pages.push(page)
	})
    })

    socket.on('loadPage', function(data) {
	$scope.pageText =  $sce.trustAsHtml(data)
    })


}])
