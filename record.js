var app = angular.module('app', ['ui.ace']);

app.directive('recordText', function() {
	return {
		restrict: 'A',
		controller: recordTextDirectiveController
	}
})

app.directive('textPlayer', function() {
	return {
		restrict: 'A',
		controller: textPlayerDirectiveController
	}
})

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

app.controller('myController', function($scope) {
	$scope.recordedModel = [];
	$scope.text = "start typing";
	$scope.reset = function() {
		$scope.recordedModel = [];
		$scope.text = "start typing";
	}
})


