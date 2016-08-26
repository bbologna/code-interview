import view from '../views/home.html'

export default function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        controller: 'HomeController',
        template:  view
    })
}