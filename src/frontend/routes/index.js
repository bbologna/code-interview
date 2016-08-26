import view from 'html!../views/home.html'

export default function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        controller: 'HomeController',
        template:  view
    })
}