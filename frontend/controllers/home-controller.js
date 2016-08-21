
export default function ($scope) {
	$scope.recordedModel = [];
	$scope.text = "start typing";
	$scope.reset = function() {
		$scope.recordedModel = [];
		$scope.text = "start typing";
	}
}
