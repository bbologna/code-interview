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
/******/ 	var hotCurrentHash = "426d4e6457ddefdd8119"; // eslint-disable-line no-unused-vars
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

	eval("'use strict';\n\nvar _console, _console2, _angular$module$direc, _angular$module$direc2, _angular$module$direc3, _angular$module;\n\nvar _angular = __webpack_require__(8);\n\nvar _angular2 = _interopRequireDefault(_angular);\n\nvar _recordText = __webpack_require__(3);\n\nvar _recordText2 = _interopRequireDefault(_recordText);\n\nvar _textPlayer = __webpack_require__(4);\n\nvar _textPlayer2 = _interopRequireDefault(_textPlayer);\n\nvar _homeController = __webpack_require__(1);\n\nvar _homeController2 = _interopRequireDefault(_homeController);\n\nvar _playerController = __webpack_require__(2);\n\nvar _playerController2 = _interopRequireDefault(_playerController);\n\nvar _index = __webpack_require__(7);\n\nvar _index2 = _interopRequireDefault(_index);\n\nvar _index3 = __webpack_require__(5);\n\nvar _index4 = _interopRequireDefault(_index3);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n// Directives\n\n\n// Controllers\n\n\n// Index view\n\n\n(_console = console).log.apply(_console, ['homeController'].concat(_toConsumableArray(_homeController2.default)));\n(_console2 = console).log.apply(_console2, ['playerController'].concat(_toConsumableArray(_playerController2.default)));\n\n// Routes\n\n\n(_angular$module$direc = (_angular$module$direc2 = (_angular$module$direc3 = (_angular$module = _angular2.default.module('app', ['ui.ace', 'ngRoute'])).directive.apply(_angular$module, _toConsumableArray(_recordText2.default))).directive.apply(_angular$module$direc3, _toConsumableArray(_textPlayer2.default))).controller.apply(_angular$module$direc2, _toConsumableArray(_homeController2.default))).controller.apply(_angular$module$direc, _toConsumableArray(_playerController2.default)).config(_index4.default);\n\nif (true) {\n\t\tmodule.hot.accept();\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQvaW5kZXguanM/OTk3MCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBTUE7Ozs7Ozs7O0FBZkE7OztBQUlBOzs7QUFJQTs7O0FBR0EscUJBQVEsR0FBUixrQkFBWSxnQkFBWjtBQUNBLHNCQUFRLEdBQVIsbUJBQVksa0JBQVo7O0FBRUE7OztBQUdBLGtIQUFRLE1BQVIsQ0FBZSxLQUFmLEVBQXNCLENBQ3BCLFFBRG9CLEVBRXBCLFNBRm9CLENBQXRCLEdBSUUsU0FKRixtRUFLRSxTQUxGLDBFQU1FLFVBTkYsOEVBT0UsVUFQRiw4RUFRRSxNQVJGOztBQVdBLElBQUksSUFBSixFQUFnQjtBQUNkLFNBQU8sR0FBUCxDQUFXLE1BQVg7QUFDRCIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXInXHJcblxyXG4vLyBEaXJlY3RpdmVzXHJcbmltcG9ydCByZWNvcmRUZXh0IGZyb20gJy4vZGlyZWN0aXZlcy9yZWNvcmQtdGV4dC5qcydcclxuaW1wb3J0IHRleHRQbGF5ZXIgZnJvbSAnLi9kaXJlY3RpdmVzL3RleHQtcGxheWVyLmpzJ1xyXG5cclxuLy8gQ29udHJvbGxlcnNcclxuaW1wb3J0IGhvbWVDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvaG9tZS1jb250cm9sbGVyLmpzJ1xyXG5pbXBvcnQgcGxheWVyQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL3BsYXllci1jb250cm9sbGVyLmpzJ1xyXG5cclxuLy8gSW5kZXggdmlld1xyXG5pbXBvcnQgdmlldyBmcm9tICcuL3ZpZXdzL2luZGV4Lmh0bWwnXHJcblxyXG5jb25zb2xlLmxvZygnaG9tZUNvbnRyb2xsZXInLCAuLi5ob21lQ29udHJvbGxlcik7XHJcbmNvbnNvbGUubG9nKCdwbGF5ZXJDb250cm9sbGVyJywgLi4ucGxheWVyQ29udHJvbGxlcik7XHJcblxyXG4vLyBSb3V0ZXNcclxuaW1wb3J0IHJvdXRlcyBmcm9tICcuL3JvdXRlcy9pbmRleC5qcydcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXHJcblx0XHQndWkuYWNlJywgXHJcblx0XHQnbmdSb3V0ZSdcclxuXHRdKVxyXG5cdC5kaXJlY3RpdmUoLi4ucmVjb3JkVGV4dClcclxuXHQuZGlyZWN0aXZlKC4uLnRleHRQbGF5ZXIpXHJcblx0LmNvbnRyb2xsZXIoLi4uaG9tZUNvbnRyb2xsZXIpXHJcblx0LmNvbnRyb2xsZXIoLi4ucGxheWVyQ29udHJvbGxlcilcclxuXHQuY29uZmlnKHJvdXRlcylcclxuXHJcblxyXG5pZiAobW9kdWxlLmhvdCkge1xyXG4gIG1vZHVsZS5ob3QuYWNjZXB0KCk7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mcm9udGVuZC9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = ['HomeController', [function () {\n\tvar _this = this;\n\n\tthis.recordedModel = [];\n\tthis.response = \"Hello dfa\";\n\tthis.reset = function () {\n\t\t_this.recordedModel = [];\n\t\t_this.text = \"start typing\";\n\t};\n}]];//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQvY29udHJvbGxlcnMvaG9tZS1jb250cm9sbGVyLmpzP2JkYjQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQ2UsQ0FDZCxnQkFEYyxFQUViLENBQUMsWUFBWTtBQUFBOztBQUNiLE1BQUssYUFBTCxHQUFxQixFQUFyQjtBQUNBLE1BQUssUUFBTCxHQUFnQixXQUFoQjtBQUNBLE1BQUssS0FBTCxHQUFhLFlBQU07QUFDbEIsUUFBSyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsUUFBSyxJQUFMLEdBQVksY0FBWjtBQUNBLEVBSEQ7QUFJQSxDQVBBLENBRmEsQyIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBkZWZhdWx0IFtcclxuXHQnSG9tZUNvbnRyb2xsZXInLFxyXG5cdCBbZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5yZWNvcmRlZE1vZGVsID0gW107XHJcblx0XHR0aGlzLnJlc3BvbnNlID0gXCJIZWxsbyBkZmFcIjtcclxuXHRcdHRoaXMucmVzZXQgPSAoKSA9PiB7XHJcblx0XHRcdHRoaXMucmVjb3JkZWRNb2RlbCA9IFtdO1xyXG5cdFx0XHR0aGlzLnRleHQgPSBcInN0YXJ0IHR5cGluZ1wiO1xyXG5cdFx0fVxyXG5cdH1dXHJcbl1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZnJvbnRlbmQvY29udHJvbGxlcnMvaG9tZS1jb250cm9sbGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = ['PlayerController', [function () {\n\tvar _this = this;\n\n\tthis.recordedModel = [];\n\tthis.response = \"Hello\";\n\tthis.reset = function () {\n\t\t_this.recordedModel = [];\n\t\t_this.text = \"start typing\";\n\t};\n}]];//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQvY29udHJvbGxlcnMvcGxheWVyLWNvbnRyb2xsZXIuanM/YjA0MyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFDZ0IsQ0FDZixrQkFEZSxFQUVmLENBQUMsWUFBWTtBQUFBOztBQUNaLE1BQUssYUFBTCxHQUFxQixFQUFyQjtBQUNBLE1BQUssUUFBTCxHQUFnQixPQUFoQjtBQUNBLE1BQUssS0FBTCxHQUFhLFlBQU07QUFDbEIsUUFBSyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsUUFBSyxJQUFMLEdBQVksY0FBWjtBQUNBLEVBSEQ7QUFJQSxDQVBELENBRmUsQyIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBkZWZhdWx0ICBbIFxyXG5cdCdQbGF5ZXJDb250cm9sbGVyJyxcclxuXHRbZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5yZWNvcmRlZE1vZGVsID0gW107XHJcblx0XHR0aGlzLnJlc3BvbnNlID0gXCJIZWxsb1wiO1xyXG5cdFx0dGhpcy5yZXNldCA9ICgpID0+IHtcclxuXHRcdFx0dGhpcy5yZWNvcmRlZE1vZGVsID0gW107XHJcblx0XHRcdHRoaXMudGV4dCA9IFwic3RhcnQgdHlwaW5nXCI7XHJcblx0XHR9XHJcblx0fV1cclxuXVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mcm9udGVuZC9jb250cm9sbGVycy9wbGF5ZXItY29udHJvbGxlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = ['recordText', function () {\n\treturn {\n\t\trestrict: 'A',\n\t\tcontroller: recordTextDirectiveController,\n\t\tscope: {\n\t\t\ttext: \"=recordText\",\n\t\t\trecord: \"=recordOutput\"\n\t\t}\n\t};\n}];\n\n\nvar recordTextDirectiveController = function recordTextDirectiveController($scope, $timeout) {\n\tvar vm = this;\n\tvm.startTime = new Date().getTime();\n\tvm.record = true;\n\t$scope.record = $scope.record || [];\n\n\t$scope.stop = function () {\n\t\tvm.record = false;\n\t};\n\n\t$scope.$watch(function () {\n\t\treturn $scope.text;\n\t}, function () {\n\t\tconsole.log(\"Listener executed\");\n\t\t$scope.record.push({\n\t\t\ttime: new Date().getTime(),\n\t\t\tvalue: $scope.text\n\t\t});\n\t});\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQvZGlyZWN0aXZlcy9yZWNvcmQtdGV4dC5qcz80OTIwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUNlLENBQ2QsWUFEYyxFQUVkLFlBQVc7QUFDWCxRQUFPO0FBQ04sWUFBVSxHQURKO0FBRU4sY0FBWSw2QkFGTjtBQUdOLFNBQU87QUFDTixTQUFPLGFBREQ7QUFFTixXQUFTO0FBRkg7QUFIRCxFQUFQO0FBUUEsQ0FYYyxDOzs7QUFhZixJQUFJLGdDQUFnQyxTQUFoQyw2QkFBZ0MsQ0FBUyxNQUFULEVBQWlCLFFBQWpCLEVBQTJCO0FBQzlELEtBQUksS0FBSyxJQUFUO0FBQ0EsSUFBRyxTQUFILEdBQWUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFmO0FBQ0EsSUFBRyxNQUFILEdBQVksSUFBWjtBQUNBLFFBQU8sTUFBUCxHQUFnQixPQUFPLE1BQVAsSUFBaUIsRUFBakM7O0FBRUEsUUFBTyxJQUFQLEdBQWMsWUFBVztBQUN4QixLQUFHLE1BQUgsR0FBWSxLQUFaO0FBQ0EsRUFGRDs7QUFJQSxRQUFPLE1BQVAsQ0FDQyxZQUFXO0FBQUUsU0FBTyxPQUFPLElBQWQ7QUFBb0IsRUFEbEMsRUFFQyxZQUFXO0FBQ1YsVUFBUSxHQUFSLENBQVksbUJBQVo7QUFDQSxTQUFPLE1BQVAsQ0FBYyxJQUFkLENBQW1CO0FBQ2xCLFNBQU0sSUFBSSxJQUFKLEdBQVcsT0FBWCxFQURZO0FBRWxCLFVBQU8sT0FBTztBQUZJLEdBQW5CO0FBSUEsRUFSRjtBQVVBLENBcEJEIiwiZmlsZSI6IjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGRlZmF1bHQgW1xyXG5cdCdyZWNvcmRUZXh0JyxcclxuXHRmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cmVzdHJpY3Q6ICdBJyxcclxuXHRcdGNvbnRyb2xsZXI6IHJlY29yZFRleHREaXJlY3RpdmVDb250cm9sbGVyLFxyXG5cdFx0c2NvcGU6IHtcclxuXHRcdFx0dGV4dCA6IFwiPXJlY29yZFRleHRcIixcclxuXHRcdFx0cmVjb3JkIDogXCI9cmVjb3JkT3V0cHV0XCJcclxuXHRcdH1cclxuXHR9XHJcbn1dXHJcblxyXG52YXIgcmVjb3JkVGV4dERpcmVjdGl2ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsICR0aW1lb3V0KSB7XHJcblx0dmFyIHZtID0gdGhpcztcclxuXHR2bS5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHR2bS5yZWNvcmQgPSB0cnVlO1xyXG5cdCRzY29wZS5yZWNvcmQgPSAkc2NvcGUucmVjb3JkIHx8IFtdO1xyXG5cclxuXHQkc2NvcGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dm0ucmVjb3JkID0gZmFsc2U7IFxyXG5cdH1cclxuXHJcblx0JHNjb3BlLiR3YXRjaChcclxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gJHNjb3BlLnRleHQgfSxcclxuXHRcdGZ1bmN0aW9uKCkgeyBcclxuXHRcdFx0Y29uc29sZS5sb2coXCJMaXN0ZW5lciBleGVjdXRlZFwiKTtcclxuXHRcdFx0JHNjb3BlLnJlY29yZC5wdXNoKHtcclxuXHRcdFx0XHR0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuXHRcdFx0XHR2YWx1ZTogJHNjb3BlLnRleHRcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHQpO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZnJvbnRlbmQvZGlyZWN0aXZlcy9yZWNvcmQtdGV4dC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = ['textPlayer', function () {\n\treturn {\n\t\trestrict: 'A',\n\t\tcontroller: textPlayerDirectiveController,\n\t\tscope: {\n\t\t\ttext: \"=playerText\",\n\t\t\trecord: \"=playerRecord\",\n\t\t\tstage: \"=stage\"\n\t\t}\n\t};\n}];\n\n\nvar textPlayerDirectiveController = function textPlayerDirectiveController($scope, $timeout) {\n\tvar vm = this;\n\tvm.toPlay = [];\n\t$scope.stage = $scope.text;\n\n\tvar play = function playFrame(index, ms) {\n\t\tvar item = vm.toPlay[index];\n\t\tif (!item) return;\n\t\t$scope.stage = item.value;\n\t\t$timeout(function () {\n\t\t\tplayFrame(index + 1, item.time);\n\t\t}, item.time - ms);\n\t};\n\n\t$scope.start = function (d) {\n\t\tvm.toPlay = angular.copy($scope.playerRecord);\n\t\tplay(0, vm.toPlay[0].time);\n\t};\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQvZGlyZWN0aXZlcy90ZXh0LXBsYXllci5qcz8yYTI4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUNlLENBQ2QsWUFEYyxFQUVkLFlBQVc7QUFDWCxRQUFPO0FBQ04sWUFBVSxHQURKO0FBRU4sY0FBWSw2QkFGTjtBQUdOLFNBQU87QUFDTixTQUFPLGFBREQ7QUFFTixXQUFTLGVBRkg7QUFHTixVQUFRO0FBSEY7QUFIRCxFQUFQO0FBU0EsQ0FaYyxDOzs7QUFjZixJQUFJLGdDQUFnQyxTQUFoQyw2QkFBZ0MsQ0FBUyxNQUFULEVBQWlCLFFBQWpCLEVBQTJCO0FBQzlELEtBQUksS0FBSyxJQUFUO0FBQ0EsSUFBRyxNQUFILEdBQVksRUFBWjtBQUNBLFFBQU8sS0FBUCxHQUFlLE9BQU8sSUFBdEI7O0FBRUEsS0FBSSxPQUFPLFNBQVMsU0FBVCxDQUFtQixLQUFuQixFQUEwQixFQUExQixFQUE4QjtBQUN4QyxNQUFJLE9BQU8sR0FBRyxNQUFILENBQVUsS0FBVixDQUFYO0FBQ0EsTUFBSSxDQUFDLElBQUwsRUFBVztBQUNYLFNBQU8sS0FBUCxHQUFlLEtBQUssS0FBcEI7QUFDQyxXQUNDLFlBQVk7QUFDWCxhQUFVLFFBQVEsQ0FBbEIsRUFBcUIsS0FBSyxJQUExQjtBQUNBLEdBSEYsRUFJQyxLQUFLLElBQUwsR0FBWSxFQUpiO0FBTUQsRUFWRDs7QUFZQSxRQUFPLEtBQVAsR0FBZSxVQUFTLENBQVQsRUFBWTtBQUMxQixLQUFHLE1BQUgsR0FBWSxRQUFRLElBQVIsQ0FBYSxPQUFPLFlBQXBCLENBQVo7QUFDQSxPQUFLLENBQUwsRUFBUSxHQUFHLE1BQUgsQ0FBVSxDQUFWLEVBQWEsSUFBckI7QUFDQSxFQUhEO0FBSUEsQ0FyQkQiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZGVmYXVsdCBbXHJcblx0J3RleHRQbGF5ZXInLFxyXG5cdGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRyZXN0cmljdDogJ0EnLFxyXG5cdFx0Y29udHJvbGxlcjogdGV4dFBsYXllckRpcmVjdGl2ZUNvbnRyb2xsZXIsXHJcblx0XHRzY29wZToge1xyXG5cdFx0XHR0ZXh0IDogXCI9cGxheWVyVGV4dFwiLFxyXG5cdFx0XHRyZWNvcmQgOiBcIj1wbGF5ZXJSZWNvcmRcIixcclxuXHRcdFx0c3RhZ2UgOiBcIj1zdGFnZVwiXHJcblx0XHR9XHJcblx0fVxyXG59XVxyXG5cclxudmFyIHRleHRQbGF5ZXJEaXJlY3RpdmVDb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlLCAkdGltZW91dCkge1xyXG5cdHZhciB2bSA9IHRoaXM7XHJcblx0dm0udG9QbGF5ID0gW107XHJcblx0JHNjb3BlLnN0YWdlID0gJHNjb3BlLnRleHQ7XHJcblxyXG5cdHZhciBwbGF5ID0gZnVuY3Rpb24gcGxheUZyYW1lKGluZGV4LCBtcykge1xyXG5cdFx0dmFyIGl0ZW0gPSB2bS50b1BsYXlbaW5kZXhdO1xyXG5cdFx0aWYgKCFpdGVtKSByZXR1cm47XHJcblx0XHQkc2NvcGUuc3RhZ2UgPSBpdGVtLnZhbHVlO1xyXG5cdFx0XHQkdGltZW91dChcclxuXHRcdFx0XHRmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRwbGF5RnJhbWUoaW5kZXggKyAxLCBpdGVtLnRpbWUpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRpdGVtLnRpbWUgLSBtc1xyXG5cdFx0XHQpXHJcblx0fVxyXG5cclxuXHQkc2NvcGUuc3RhcnQgPSBmdW5jdGlvbihkKSB7XHJcblx0XHR2bS50b1BsYXkgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLnBsYXllclJlY29yZCk7XHJcblx0XHRwbGF5KDAsIHZtLnRvUGxheVswXS50aW1lKTtcclxuXHR9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mcm9udGVuZC9kaXJlY3RpdmVzL3RleHQtcGxheWVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function ($routeProvider, $locationProvider) {\n    $routeProvider.when('/', {\n        controller: 'HomeController',\n        templateUrl: _home2.default\n    });\n};\n\nvar _home = __webpack_require__(6);\n\nvar _home2 = _interopRequireDefault(_home);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQvcm91dGVzL2luZGV4LmpzPzBjNmMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQUVlLFVBQVMsY0FBVCxFQUF5QixpQkFBekIsRUFBNEM7QUFDdkQsbUJBQ0MsSUFERCxDQUNNLEdBRE4sRUFDVztBQUNQLG9CQUFZLGdCQURMO0FBRVA7QUFGTyxLQURYO0FBS0gsQzs7QUFSRCIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHZpZXcgZnJvbSAnLi4vdmlld3MvaG9tZS5odG1sJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy8nLCB7XHJcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJyxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogIHZpZXdcclxuICAgIH0pXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mcm9udGVuZC9yb3V0ZXMvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"home.html\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQvdmlld3MvaG9tZS5odG1sP2Y4ZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImhvbWUuaHRtbFwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvZnJvbnRlbmQvdmlld3MvaG9tZS5odG1sXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"index.html\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQvdmlld3MvaW5kZXguaHRtbD8zOGU3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbmRleC5odG1sXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9mcm9udGVuZC92aWV3cy9pbmRleC5odG1sXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("module.exports = angular;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCI/MTFkMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);