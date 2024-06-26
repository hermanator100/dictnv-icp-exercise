import { Router } from 'express';

import ApisController from 'App/Controllers/Http/ApisController';
import UsersController from 'App/Controllers/Http/UsersController';
import ProductsController from 'App/Controllers/Http/ProductsController';

import isAuth from 'App/Middleware/Auth';

const Route = Router();

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

// USER
Route.get('/user/me', isAuth, UsersController.me);
Route.post('/user/register', isAuth, UsersController.register);
Route.post('/user/update', isAuth, UsersController.update);

//Products: Products list
Route.get('/product/search', isAuth, ProductsController.search);
Route.post('/product/register', isAuth, ProductsController.register)
Route.post('/product/update', isAuth, ProductsController.update)
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route.get('/health', ApisController.health);

// USER
Route.get('/user/:username/info', UsersController.view_info_of_user_by_public);

export { Route as routes };