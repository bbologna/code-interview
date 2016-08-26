
export default [
	'textPlayer',
	function() {
	return {
		restrict: 'A',
		controller: textPlayerDirectiveController,
		scope: {
			text : "=playerText",
			record : "=playerRecord",
			stage : "=stage"
		}
	}
}]

var textPlayerDirectiveController = function($scope, $timeout) {
	var vm = this;
	vm.toPlay = [];
	$scope.stage = $scope.text;

	var play = function playFrame(index, ms) {
		var item = vm.toPlay[index];
		if (!item) return;
		$scope.stage = item.value;
			$timeout(
				function () {
					playFrame(index + 1, item.time)
				},
				item.time - ms
			)
	}

	$scope.start = function(d) {
		vm.toPlay = angular.copy($scope.playerRecord);
		play(0, vm.toPlay[0].time);
	}
}