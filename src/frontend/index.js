
import angular from 'angular'

// Directives
import recordText from './directives/record-text.js'
import textPlayer from './directives/text-player.js'

// Controllers
import homeController from './controllers/home-controller.js'
import playerController from './controllers/player-controller.js'

// Index view
import view from 'file?name=[name].[ext]!./views/index.html'

console.log('homeController', ...homeController);
console.log('playerController', ...playerController);

// Routes
import routes from './routes/index.js'

angular.module('app', [
		'ui.ace', 
		'ngRoute'
	])
	.directive(...recordText)
	.directive(...textPlayer)
	.controller(...homeController)
	.controller(...playerController)
	.config(routes)


if (module.hot) {
  module.hot.accept();
}