module.exports = (app) => {
    const users = require('../controllers/user.controller');

    //signup 
    app.post('/signup',users.create);

    app.get('/user/:userId', users.findOne);

    app.put('/user/:userId', users.update);
    
}