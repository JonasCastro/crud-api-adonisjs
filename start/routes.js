'use strict';

const Route = use('Route');

Route.post('/users', 'UserController.create');
Route.post('/sessions', 'SessionController.create');

Route.group(() => {
  Route.resource('posts', 'PostController').apiOnly().except('update');
}).middleware(['auth']);
