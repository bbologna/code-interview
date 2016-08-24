
import angular from 'angular'
import angularRoute from 'angular-route'
import ace from 'angular-ui-ace'

// Directives
import recordText from './directives/record-text.js'
import textPlayer from './directives/text-player.js'

// Controllers
import homeController from './controllers/home-controller.js'
import playerController from './controllers/player-controller.js'

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


