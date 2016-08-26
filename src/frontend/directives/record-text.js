
export default [
	'recordText',
	function() {
	return {
		restrict: 'A',
		controller: recordTextDirectiveController,
		scope: {
			text : "=recordText",
			record : "=recordOutput"
		}
	}
}]

var recordTextDirectiveController = function($scope, $timeout) {
	var vm = this;
	vm.startTime = new Date().getTime();
	vm.record = true;
	$scope.record = $scope.record || [];

	$scope.stop = function() {
		vm.record = false; 
	}

	$scope.$watch(
		function() { return $scope.text },
		function() { 
			console.log("Listener executed");
			$scope.record.push({
				time: new Date().getTime(),
				value: $scope.text
			})
		}
	);
}