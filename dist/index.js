/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _angular$module$direc, _angular$module$direc2, _angular$module$direc3, _angular$module;

	var _angular = __webpack_require__(1);

	var _angular2 = _interopRequireDefault(_angular);

	var _angularRoute = __webpack_require__(2);

	var _angularRoute2 = _interopRequireDefault(_angularRoute);

	var _angularUiAce = __webpack_require__(3);

	var _angularUiAce2 = _interopRequireDefault(_angularUiAce);

	var _recordText = __webpack_require__(4);

	var _recordText2 = _interopRequireDefault(_recordText);

	var _textPlayer = __webpack_require__(5);

	var _textPlayer2 = _interopRequireDefault(_textPlayer);

	var _homeController = __webpack_require__(6);

	var _homeController2 = _interopRequireDefault(_homeController);

	var _playerController = __webpack_require__(7);

	var _playerController2 = _interopRequireDefault(_playerController);

	var _index = __webpack_require__(8);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	// Directives


	// Controllers


	// Routes


	(_angular$module$direc = (_angular$module$direc2 = (_angular$module$direc3 = (_angular$module = _angular2.default.module('app', ['ui.ace', 'ngRoute'])).directive.apply(_angular$module, _toConsumableArray(_recordText2.default))).directive.apply(_angular$module$direc3, _toConsumableArray(_textPlayer2.default))).controller.apply(_angular$module$direc2, _toConsumableArray(_homeController2.default))).controller.apply(_angular$module$direc, _toConsumableArray(_playerController2.default)).config(_index2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = angular-route;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = angular-ui-ace;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ['recordText', function () {
		return {
			restrict: 'A',
			controller: recordTextDirectiveController,
			scope: {
				text: "=recordText",
				record: "=recordOutput"
			}
		};
	}];


	var recordTextDirectiveController = function recordTextDirectiveController($scope, $timeout) {
		var vm = this;
		vm.startTime = new Date().getTime();
		vm.record = true;
		$scope.record = $scope.record || [];

		$scope.stop = function () {
			vm.record = false;
		};

		$scope.$watch(function () {
			return $scope.text;
		}, function () {
			console.log("Listener executed");
			$scope.record.push({
				time: new Date().getTime(),
				value: $scope.text
			});
		});
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ['textPlayer', function () {
		return {
			restrict: 'A',
			controller: textPlayerDirectiveController,
			scope: {
				text: "=playerText",
				record: "=playerRecord",
				stage: "=stage"
			}
		};
	}];


	var textPlayerDirectiveController = function textPlayerDirectiveController($scope, $timeout) {
		var vm = this;
		vm.toPlay = [];
		$scope.stage = $scope.text;

		var play = function playFrame(index, ms) {
			var item = vm.toPlay[index];
			if (!item) return;
			$scope.stage = item.value;
			$timeout(function () {
				playFrame(index + 1, item.time);
			}, item.time - ms);
		};

		$scope.start = function (d) {
			vm.toPlay = angular.copy($scope.playerRecord);
			play(0, vm.toPlay[0].time);
		};
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ['HomeController', function () {
		var _this = this;

		this.recordedModel = [];
		this.response = "Hello";
		this.reset = function () {
			_this.recordedModel = [];
			_this.text = "start typing";
		};
	}];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = ['PlayerController', function () {
		var _this = this;

		this.recordedModel = [];
		this.response = "Hello";
		this.reset = function () {
			_this.recordedModel = [];
			_this.text = "start typing";
		};
	}];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function ($routeProvider, $locationProvider) {
	    $routeProvider.when('/', {
	        controller: 'HomeController'
	    });
	};

/***/ }
/******/ ]);