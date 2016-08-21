
module.export = function() {
	return {
		restrict: 'A',
		controller: textPlayerDirectiveController
	}
}

var textPlayerDirectiveController = function($scope, $timeout) {
	var vm = this;
	vm.toPlay = [];
	$scope.stage = 'Hola';

	var play = function rec(index, ms) {
		var item = vm.toPlay[index];
		if (!item) return;
		$scope.stage = item.value;
			$timeout(
				function () {
					rec(index + 1, item.time)
				},
				item.time - ms
			)
	}

	$scope.start = function(d) {
		vm.toPlay = angular.copy($scope.recordedModel);
		play(0, vm.toPlay[0].time);
	}
}