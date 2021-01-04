module.exports = (app) => {
    const users = require('../controllers/user.controller');

    //signup 
    app.post('/signup',users.create);
}