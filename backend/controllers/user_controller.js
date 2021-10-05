const { User } = require('../models');
const { decode } = require('../helpers/bcryptjs');
const { sign } = require('../helpers/jwt');

module.exports = class userController {
    static register(req, res, next) {
        let { email, password } = req.body;
        let newUser = {
            email,
            password,
        };
        if (req.body.role) {
            newUser[`role`] = req.body.role;
        } else {
            newUser[`role`] = 'Customer';
        }

        console.log(req.body)

        User.create(newUser)
        .then((data) => {
            let { id, email, role } = data;
            res.status(201).json({ id, email, role });
        })
        .catch((err) => {
            console.log('tes')
            next({ name: 'InternalError', message: err.message });
        });
    }
    
    static login(req, res, next) {
        let { email, password } = req.body;

        if (!email || !password) {
            next({ name: 'Required' });
        } else {
            User.findOne({ where: { email } })
            .then((data) => {
                if (data) {
                    if (decode(password, data.password)) {
                        let { id, email, role } = data;
                        let access_token = sign({ id, email, role });
                        res.status(200).json({ access_token: `${access_token} ${role}` });
                    } else {
                        next({ name: 'Invalid' });
                    }
                } else {
                    next({ name: 'UserNotFound' });
                }
            })
            .catch((err) => {
                next({ name: 'InternalError', message: err.message });
            });
        }
    }
};