const User = require('../models/users.model');
const crypto = require('crypto');
const usersModel = require('../models/users.model');

/**
 * create new user 
 * @param {any} req 
 * @param {any} res 
 */
exports.create = (req, res) => {
    //validate 
    if(!req.body.email || !req.body.password){
        return res.status(400).send({
            message: "Email/Password required"
        });
    }

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                    .update(req.body.password)
                    .digest('base64'); 
    req.body.password = salt+ "$"+ hash;
    req.body.permissionLevel = 1; 

    //create new user 
    const note = new User({
        email: req.body.email, 
        password: req.body.password, 
        permissionLevel: req.body.permissionLevel
    });


    note.save()
        .then(data => {
            res.send(data); 
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
}

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if(!user){
                return res.status(404).send({
                    message: `User with id ${req.params.userId} not found`
                }); 
            }
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: `User with id ${req.params.userId} not found`
                });
            }

            return res.status(500).send({
                message:  `Error retrieving note with id `+req.params.userId
            });
        })
}