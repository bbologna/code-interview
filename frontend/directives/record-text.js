
module.export =  function() {
	return {
		restrict: 'A',
		controller: recordTextDirectiveController
	}
}

var recordTextDirectiveController = function($scope, $timeout) {
	var vm = this;
	vm.startTime = new Date().getTime();
	vm.record = true;

	$scope.stop = function() {
		vm.record = false; 
	}

	$scope.snapshot = function() {
		$timeout(function() {
			$scope.recordedModel.push({
				time: new Date().getTime(),
				value: $scope.text
			})
			if (vm.record)
				$scope.snapshot();
		}, 350);
	}
}