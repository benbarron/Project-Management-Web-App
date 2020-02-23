const route = require('express').Router();

const { auth, photoCache } = middleware;

/*
 *  LOGIN IN AND AUTHENTICATION ROUTES
 */
route.post('/auth/users', LoginController.register); // creates new user
route.post('/auth/login', LoginController.login); // login route
route.get('/auth/user', auth, LoginController.authenticate); // authenticates the user on page load
route.post('/auth/send-reset-link', LoginController.sendPasswordResetLink); // send password reset link to user's email

/*
 *  BOARD ROUTES
 */
route.get('/boards', auth, BoardController.index);
route.post('/boards/', auth, BoardController.store);
route.put('/boards/bg/:id', auth, BoardController.updateBackground);
route.put('/boards/:id', auth, BoardController.update);
route.post('/boards/clone/:id', auth, BoardController.clone);
route.delete('/boards/:id', auth, BoardController.delete);

/*
 *  CARD ROUTES
 */
route.get('/cards', auth, CardController.index);
route.post('/cards', auth, CardController.store);
route.put('/cards/:id', auth, CardController.update);
route.delete('/cards/:id', auth, CardController.delete);

/*
 *  TODO ROUTES
 */
route.get('/todos', auth, TodoController.index);
route.post('/todos', auth, TodoController.store);
route.put('/todos/:id', auth, TodoController.update);
route.delete('/todos/delete/:id', auth, TodoController.delete);

/*
 *  DRAG AND DROP ROUTES
 */
route.post('/dnd/reorder-cards', auth, DragAndDropController.reorderCards);
route.post('/dnd/move-item', auth, DragAndDropController.moveItem);

/*
 *  SEARCH ROUTES
 */
route.get('/photos/:keyword', auth, photoCache, SearchController.photos);
route.get('/users/search/:query', auth, SearchController.users);

module.exports = route;
