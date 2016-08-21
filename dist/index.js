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

	var _homeController = __webpack_require__(1);

	var _homeController2 = _interopRequireDefault(_homeController);

	var _recordText = __webpack_require__(2);

	var _recordText2 = _interopRequireDefault(_recordText);

	var _textPlayer = __webpack_require__(4);

	var _textPlayer2 = _interopRequireDefault(_textPlayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log(_homeController2.default);

	angular.module('app', ['ui.ace']).directive('recordText', __webpack_require__(2)).directive('textPlayer', __webpack_require__(4)).controller('homeController', _homeController2.default);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function ($scope) {
		$scope.recordedModel = [];
		$scope.text = "start typing";
		$scope.reset = function () {
			$scope.recordedModel = [];
			$scope.text = "start typing";
		};
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	module.export = function () {
		return {
			restrict: 'A',
			controller: recordTextDirectiveController
		};
	};

	var recordTextDirectiveController = function recordTextDirectiveController($scope, $timeout) {
		var vm = this;
		vm.startTime = new Date().getTime();
		vm.record = true;

		$scope.stop = function () {
			vm.record = false;
		};

		$scope.snapshot = function () {
			$timeout(function () {
				$scope.recordedModel.push({
					time: new Date().getTime(),
					value: $scope.text
				});
				if (vm.record) $scope.snapshot();
			}, 350);
		};
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	module.export = function () {
		return {
			restrict: 'A',
			controller: textPlayerDirectiveController
		};
	};

	var textPlayerDirectiveController = function textPlayerDirectiveController($scope, $timeout) {
		var vm = this;
		vm.toPlay = [];
		$scope.stage = 'Hola';

		var play = function rec(index, ms) {
			var item = vm.toPlay[index];
			if (!item) return;
			$scope.stage = item.value;
			$timeout(function () {
				rec(index + 1, item.time);
			}, item.time - ms);
		};

		$scope.start = function (d) {
			vm.toPlay = angular.copy($scope.recordedModel);
			play(0, vm.toPlay[0].time);
		};
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }
/******/ ]);