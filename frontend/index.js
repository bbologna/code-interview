
import homeController from './controllers/home-controller.js'
import recordText from './directives/record-text.js'
import textPlayer from './directives/text-player.js'

console.log(homeController);

angular.module('app', ['ui.ace']) // ui ace not found on webpack
	.directive('recordText', require('./directives/record-text.js'))
	.directive('textPlayer', require('./directives/text-player.js'))
	.controller('homeController', homeController)


