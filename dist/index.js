/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "1a2c41f71a072fb2ab95"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

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

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _console, _console2, _angular$module$direc, _angular$module$direc2, _angular$module$direc3, _angular$module;\n\nvar _angular = __webpack_require__(6);\n\nvar _angular2 = _interopRequireDefault(_angular);\n\nvar _recordText = __webpack_require__(3);\n\nvar _recordText2 = _interopRequireDefault(_recordText);\n\nvar _textPlayer = __webpack_require__(4);\n\nvar _textPlayer2 = _interopRequireDefault(_textPlayer);\n\nvar _homeController = __webpack_require__(1);\n\nvar _homeController2 = _interopRequireDefault(_homeController);\n\nvar _playerController = __webpack_require__(2);\n\nvar _playerController2 = _interopRequireDefault(_playerController);\n\nvar _index = __webpack_require__(5);\n\nvar _index2 = _interopRequireDefault(_index);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n// Directives\n\n\n// Controllers\n\n\n(_console = console).log.apply(_console, ['homeController'].concat(_toConsumableArray(_homeController2.default)));\n(_console2 = console).log.apply(_console2, ['playerController'].concat(_toConsumableArray(_playerController2.default)));\n\n// Routes\n\n\n(_angular$module$direc = (_angular$module$direc2 = (_angular$module$direc3 = (_angular$module = _angular2.default.module('app', ['ui.ace', 'ngRoute'])).directive.apply(_angular$module, _toConsumableArray(_recordText2.default))).directive.apply(_angular$module$direc3, _toConsumableArray(_textPlayer2.default))).controller.apply(_angular$module$direc2, _toConsumableArray(_homeController2.default))).controller.apply(_angular$module$direc, _toConsumableArray(_playerController2.default)).config(_index2.default);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9pbmRleC5qcz8wNDI1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBTUE7Ozs7Ozs7O0FBWkE7OztBQUlBOzs7QUFJQSxxQkFBUSxHQUFSLGtCQUFZLGdCQUFaO0FBQ0Esc0JBQVEsR0FBUixtQkFBWSxrQkFBWjs7QUFFQTs7O0FBR0Esa0hBQVEsTUFBUixDQUFlLEtBQWYsRUFBc0IsQ0FDcEIsUUFEb0IsRUFFcEIsU0FGb0IsQ0FBdEIsR0FJRSxTQUpGLG1FQUtFLFNBTEYsMEVBTUUsVUFORiw4RUFPRSxVQVBGLDhFQVFFLE1BUkYiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyJ1xyXG5cclxuLy8gRGlyZWN0aXZlc1xyXG5pbXBvcnQgcmVjb3JkVGV4dCBmcm9tICcuL2RpcmVjdGl2ZXMvcmVjb3JkLXRleHQuanMnXHJcbmltcG9ydCB0ZXh0UGxheWVyIGZyb20gJy4vZGlyZWN0aXZlcy90ZXh0LXBsYXllci5qcydcclxuXHJcbi8vIENvbnRyb2xsZXJzXHJcbmltcG9ydCBob21lQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL2hvbWUtY29udHJvbGxlci5qcydcclxuaW1wb3J0IHBsYXllckNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9wbGF5ZXItY29udHJvbGxlci5qcydcclxuXHJcbmNvbnNvbGUubG9nKCdob21lQ29udHJvbGxlcicsIC4uLmhvbWVDb250cm9sbGVyKTtcclxuY29uc29sZS5sb2coJ3BsYXllckNvbnRyb2xsZXInLCAuLi5wbGF5ZXJDb250cm9sbGVyKTtcclxuXHJcbi8vIFJvdXRlc1xyXG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzL2luZGV4LmpzJ1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcclxuXHRcdCd1aS5hY2UnLCBcclxuXHRcdCduZ1JvdXRlJ1xyXG5cdF0pXHJcblx0LmRpcmVjdGl2ZSguLi5yZWNvcmRUZXh0KVxyXG5cdC5kaXJlY3RpdmUoLi4udGV4dFBsYXllcilcclxuXHQuY29udHJvbGxlciguLi5ob21lQ29udHJvbGxlcilcclxuXHQuY29udHJvbGxlciguLi5wbGF5ZXJDb250cm9sbGVyKVxyXG5cdC5jb25maWcocm91dGVzKVxyXG5cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnRlbmQvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = ['HomeController', [function () {\n\tvar _this = this;\n\n\tthis.recordedModel = [];\n\tthis.response = \"Hello\";\n\tthis.reset = function () {\n\t\t_this.recordedModel = [];\n\t\t_this.text = \"start typing\";\n\t};\n}]];//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb250cm9sbGVycy9ob21lLWNvbnRyb2xsZXIuanM/MTMxNCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFDZSxDQUNkLGdCQURjLEVBRWIsQ0FBQyxZQUFZO0FBQUE7O0FBQ2IsTUFBSyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsTUFBSyxRQUFMLEdBQWdCLE9BQWhCO0FBQ0EsTUFBSyxLQUFMLEdBQWEsWUFBTTtBQUNsQixRQUFLLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxRQUFLLElBQUwsR0FBWSxjQUFaO0FBQ0EsRUFIRDtBQUlBLENBUEEsQ0FGYSxDIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGRlZmF1bHQgW1xyXG5cdCdIb21lQ29udHJvbGxlcicsXHJcblx0IFtmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnJlY29yZGVkTW9kZWwgPSBbXTtcclxuXHRcdHRoaXMucmVzcG9uc2UgPSBcIkhlbGxvXCI7XHJcblx0XHR0aGlzLnJlc2V0ID0gKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnJlY29yZGVkTW9kZWwgPSBbXTtcclxuXHRcdFx0dGhpcy50ZXh0ID0gXCJzdGFydCB0eXBpbmdcIjtcclxuXHRcdH1cclxuXHR9XVxyXG5dXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnRlbmQvY29udHJvbGxlcnMvaG9tZS1jb250cm9sbGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = ['PlayerController', [function () {\n\tvar _this = this;\n\n\tthis.recordedModel = [];\n\tthis.response = \"Hello\";\n\tthis.reset = function () {\n\t\t_this.recordedModel = [];\n\t\t_this.text = \"start typing\";\n\t};\n}]];//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb250cm9sbGVycy9wbGF5ZXItY29udHJvbGxlci5qcz84YTE3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUNnQixDQUNmLGtCQURlLEVBRWYsQ0FBQyxZQUFZO0FBQUE7O0FBQ1osTUFBSyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsTUFBSyxRQUFMLEdBQWdCLE9BQWhCO0FBQ0EsTUFBSyxLQUFMLEdBQWEsWUFBTTtBQUNsQixRQUFLLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxRQUFLLElBQUwsR0FBWSxjQUFaO0FBQ0EsRUFIRDtBQUlBLENBUEQsQ0FGZSxDIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGRlZmF1bHQgIFsgXHJcblx0J1BsYXllckNvbnRyb2xsZXInLFxyXG5cdFtmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnJlY29yZGVkTW9kZWwgPSBbXTtcclxuXHRcdHRoaXMucmVzcG9uc2UgPSBcIkhlbGxvXCI7XHJcblx0XHR0aGlzLnJlc2V0ID0gKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnJlY29yZGVkTW9kZWwgPSBbXTtcclxuXHRcdFx0dGhpcy50ZXh0ID0gXCJzdGFydCB0eXBpbmdcIjtcclxuXHRcdH1cclxuXHR9XVxyXG5dXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnRlbmQvY29udHJvbGxlcnMvcGxheWVyLWNvbnRyb2xsZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = ['recordText', function () {\n\treturn {\n\t\trestrict: 'A',\n\t\tcontroller: recordTextDirectiveController,\n\t\tscope: {\n\t\t\ttext: \"=recordText\",\n\t\t\trecord: \"=recordOutput\"\n\t\t}\n\t};\n}];\n\n\nvar recordTextDirectiveController = function recordTextDirectiveController($scope, $timeout) {\n\tvar vm = this;\n\tvm.startTime = new Date().getTime();\n\tvm.record = true;\n\t$scope.record = $scope.record || [];\n\n\t$scope.stop = function () {\n\t\tvm.record = false;\n\t};\n\n\t$scope.$watch(function () {\n\t\treturn $scope.text;\n\t}, function () {\n\t\tconsole.log(\"Listener executed\");\n\t\t$scope.record.push({\n\t\t\ttime: new Date().getTime(),\n\t\t\tvalue: $scope.text\n\t\t});\n\t});\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kaXJlY3RpdmVzL3JlY29yZC10ZXh0LmpzP2ZhMzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQ2UsQ0FDZCxZQURjLEVBRWQsWUFBVztBQUNYLFFBQU87QUFDTixZQUFVLEdBREo7QUFFTixjQUFZLDZCQUZOO0FBR04sU0FBTztBQUNOLFNBQU8sYUFERDtBQUVOLFdBQVM7QUFGSDtBQUhELEVBQVA7QUFRQSxDQVhjLEM7OztBQWFmLElBQUksZ0NBQWdDLFNBQWhDLDZCQUFnQyxDQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMkI7QUFDOUQsS0FBSSxLQUFLLElBQVQ7QUFDQSxJQUFHLFNBQUgsR0FBZSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQWY7QUFDQSxJQUFHLE1BQUgsR0FBWSxJQUFaO0FBQ0EsUUFBTyxNQUFQLEdBQWdCLE9BQU8sTUFBUCxJQUFpQixFQUFqQzs7QUFFQSxRQUFPLElBQVAsR0FBYyxZQUFXO0FBQ3hCLEtBQUcsTUFBSCxHQUFZLEtBQVo7QUFDQSxFQUZEOztBQUlBLFFBQU8sTUFBUCxDQUNDLFlBQVc7QUFBRSxTQUFPLE9BQU8sSUFBZDtBQUFvQixFQURsQyxFQUVDLFlBQVc7QUFDVixVQUFRLEdBQVIsQ0FBWSxtQkFBWjtBQUNBLFNBQU8sTUFBUCxDQUFjLElBQWQsQ0FBbUI7QUFDbEIsU0FBTSxJQUFJLElBQUosR0FBVyxPQUFYLEVBRFk7QUFFbEIsVUFBTyxPQUFPO0FBRkksR0FBbkI7QUFJQSxFQVJGO0FBVUEsQ0FwQkQiLCJmaWxlIjoiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZGVmYXVsdCBbXHJcblx0J3JlY29yZFRleHQnLFxyXG5cdGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDogJ0EnLFxyXG5cdFx0Y29udHJvbGxlcjogcmVjb3JkVGV4dERpcmVjdGl2ZUNvbnRyb2xsZXIsXHJcblx0XHRzY29wZToge1xyXG5cdFx0XHR0ZXh0IDogXCI9cmVjb3JkVGV4dFwiLFxyXG5cdFx0XHRyZWNvcmQgOiBcIj1yZWNvcmRPdXRwdXRcIlxyXG5cdFx0fVxyXG5cdH1cclxufV1cclxuXHJcbnZhciByZWNvcmRUZXh0RGlyZWN0aXZlQ29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQpIHtcclxuXHR2YXIgdm0gPSB0aGlzO1xyXG5cdHZtLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdHZtLnJlY29yZCA9IHRydWU7XHJcblx0JHNjb3BlLnJlY29yZCA9ICRzY29wZS5yZWNvcmQgfHwgW107XHJcblxyXG5cdCRzY29wZS5zdG9wID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2bS5yZWNvcmQgPSBmYWxzZTsgXHJcblx0fVxyXG5cclxuXHQkc2NvcGUuJHdhdGNoKFxyXG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiAkc2NvcGUudGV4dCB9LFxyXG5cdFx0ZnVuY3Rpb24oKSB7IFxyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkxpc3RlbmVyIGV4ZWN1dGVkXCIpO1xyXG5cdFx0XHQkc2NvcGUucmVjb3JkLnB1c2goe1xyXG5cdFx0XHRcdHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxyXG5cdFx0XHRcdHZhbHVlOiAkc2NvcGUudGV4dFxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdCk7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Zyb250ZW5kL2RpcmVjdGl2ZXMvcmVjb3JkLXRleHQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = ['textPlayer', function () {\n\treturn {\n\t\trestrict: 'A',\n\t\tcontroller: textPlayerDirectiveController,\n\t\tscope: {\n\t\t\ttext: \"=playerText\",\n\t\t\trecord: \"=playerRecord\",\n\t\t\tstage: \"=stage\"\n\t\t}\n\t};\n}];\n\n\nvar textPlayerDirectiveController = function textPlayerDirectiveController($scope, $timeout) {\n\tvar vm = this;\n\tvm.toPlay = [];\n\t$scope.stage = $scope.text;\n\n\tvar play = function playFrame(index, ms) {\n\t\tvar item = vm.toPlay[index];\n\t\tif (!item) return;\n\t\t$scope.stage = item.value;\n\t\t$timeout(function () {\n\t\t\tplayFrame(index + 1, item.time);\n\t\t}, item.time - ms);\n\t};\n\n\t$scope.start = function (d) {\n\t\tvm.toPlay = angular.copy($scope.playerRecord);\n\t\tplay(0, vm.toPlay[0].time);\n\t};\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kaXJlY3RpdmVzL3RleHQtcGxheWVyLmpzPzA4YjEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQ2UsQ0FDZCxZQURjLEVBRWQsWUFBVztBQUNYLFFBQU87QUFDTixZQUFVLEdBREo7QUFFTixjQUFZLDZCQUZOO0FBR04sU0FBTztBQUNOLFNBQU8sYUFERDtBQUVOLFdBQVMsZUFGSDtBQUdOLFVBQVE7QUFIRjtBQUhELEVBQVA7QUFTQSxDQVpjLEM7OztBQWNmLElBQUksZ0NBQWdDLFNBQWhDLDZCQUFnQyxDQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMkI7QUFDOUQsS0FBSSxLQUFLLElBQVQ7QUFDQSxJQUFHLE1BQUgsR0FBWSxFQUFaO0FBQ0EsUUFBTyxLQUFQLEdBQWUsT0FBTyxJQUF0Qjs7QUFFQSxLQUFJLE9BQU8sU0FBUyxTQUFULENBQW1CLEtBQW5CLEVBQTBCLEVBQTFCLEVBQThCO0FBQ3hDLE1BQUksT0FBTyxHQUFHLE1BQUgsQ0FBVSxLQUFWLENBQVg7QUFDQSxNQUFJLENBQUMsSUFBTCxFQUFXO0FBQ1gsU0FBTyxLQUFQLEdBQWUsS0FBSyxLQUFwQjtBQUNDLFdBQ0MsWUFBWTtBQUNYLGFBQVUsUUFBUSxDQUFsQixFQUFxQixLQUFLLElBQTFCO0FBQ0EsR0FIRixFQUlDLEtBQUssSUFBTCxHQUFZLEVBSmI7QUFNRCxFQVZEOztBQVlBLFFBQU8sS0FBUCxHQUFlLFVBQVMsQ0FBVCxFQUFZO0FBQzFCLEtBQUcsTUFBSCxHQUFZLFFBQVEsSUFBUixDQUFhLE9BQU8sWUFBcEIsQ0FBWjtBQUNBLE9BQUssQ0FBTCxFQUFRLEdBQUcsTUFBSCxDQUFVLENBQVYsRUFBYSxJQUFyQjtBQUNBLEVBSEQ7QUFJQSxDQXJCRCIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuXHQndGV4dFBsYXllcicsXHJcblx0ZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHJlc3RyaWN0OiAnQScsXHJcblx0XHRjb250cm9sbGVyOiB0ZXh0UGxheWVyRGlyZWN0aXZlQ29udHJvbGxlcixcclxuXHRcdHNjb3BlOiB7XHJcblx0XHRcdHRleHQgOiBcIj1wbGF5ZXJUZXh0XCIsXHJcblx0XHRcdHJlY29yZCA6IFwiPXBsYXllclJlY29yZFwiLFxyXG5cdFx0XHRzdGFnZSA6IFwiPXN0YWdlXCJcclxuXHRcdH1cclxuXHR9XHJcbn1dXHJcblxyXG52YXIgdGV4dFBsYXllckRpcmVjdGl2ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XHJcblx0dmFyIHZtID0gdGhpcztcclxuXHR2bS50b1BsYXkgPSBbXTtcclxuXHQkc2NvcGUuc3RhZ2UgPSAkc2NvcGUudGV4dDtcclxuXHJcblx0dmFyIHBsYXkgPSBmdW5jdGlvbiBwbGF5RnJhbWUoaW5kZXgsIG1zKSB7XHJcblx0XHR2YXIgaXRlbSA9IHZtLnRvUGxheVtpbmRleF07XHJcblx0XHRpZiAoIWl0ZW0pIHJldHVybjtcclxuXHRcdCRzY29wZS5zdGFnZSA9IGl0ZW0udmFsdWU7XHJcblx0XHRcdCR0aW1lb3V0KFxyXG5cdFx0XHRcdGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHBsYXlGcmFtZShpbmRleCArIDEsIGl0ZW0udGltZSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGl0ZW0udGltZSAtIG1zXHJcblx0XHRcdClcclxuXHR9XHJcblxyXG5cdCRzY29wZS5zdGFydCA9IGZ1bmN0aW9uKGQpIHtcclxuXHRcdHZtLnRvUGxheSA9IGFuZ3VsYXIuY29weSgkc2NvcGUucGxheWVyUmVjb3JkKTtcclxuXHRcdHBsYXkoMCwgdm0udG9QbGF5WzBdLnRpbWUpO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnRlbmQvZGlyZWN0aXZlcy90ZXh0LXBsYXllci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function ($routeProvider, $locationProvider) {\n    $routeProvider.when('/', {\n        controller: 'HomeController',\n        templateUrl: 'Home.html'\n    });\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9yb3V0ZXMvaW5kZXguanM/NmNiMyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBQ2UsVUFBUyxjQUFULEVBQXlCLGlCQUF6QixFQUE0QztBQUN2RCxtQkFDQyxJQURELENBQ00sR0FETixFQUNXO0FBQ1Asb0JBQVksZ0JBREw7QUFFUCxxQkFBYTtBQUZOLEtBRFg7QUFLSCxDIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy8nLCB7XHJcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ0hvbWUuaHRtbCdcclxuICAgIH0pXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Zyb250ZW5kL3JvdXRlcy9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("module.exports = angular;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCI/MTFkMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI2LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);