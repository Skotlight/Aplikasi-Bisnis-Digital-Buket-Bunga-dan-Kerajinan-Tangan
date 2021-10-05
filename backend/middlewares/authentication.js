const { verify } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = (req, res, next) => {
    if(!req.headers.access_token) {
        console.log('access')
        next({ name: "NotLogin "});
    } else {
        const decoded = verify(req.headers.access_token.split(" ")[0]);
        console.log(decoded)
        User.findByPK(decoded.id)
        .then((data) => {
            if ( data ) {
                let { id, email, role } = data;
                req.currentUser = {id, email, role}
                next();
            } else {
                next({ name: "InvalidToken" });
            }
        })
        .catch((err) => {
            console.log(err.message)
            next({ name: "InternalError", message: err.message });
        });
    }
};
