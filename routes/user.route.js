module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    app.post('/createuser',users.createuser)
    app.get('/getallusers', users.findAllusers);
    
    app.post('/login', users.login);
}