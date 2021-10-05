const { Cart } = require("../models");

module.exports = (req, res, next) => {
    // Jika Admin
    if (req.currentUser.role === "Admin") {
        next();
    } else {
        // Jika Customer, lanjut pengecekan
        if (req.currentUser.role === "Customer") {
            //Jika ada Cart Id, cek jika itu cart milik user
            if (req.params.cartId) {
                let id = req.params.cartId;
                Cart.findByPk(id)
                .then((data) => {
                    if (data.userId === req.currentUser.id) {
                      next();
                    } else {
                        //Jika akses cart yang bukan milik dia
                        next({ name: "Unauthorized" });
                    }
                })
                .catch((err) => {
                    next({ name: "InternalError", message: err.message });
                });
                //Jika tidak ada cart Id, tapi ada user id, cek jika user id merupakan id milik yang login
            } else if (req.params.userId) {
                next();
            } else {
                //Jika tidak ada params user Id atau Cart Id
                next({ name: "Unauthorized" });
            }
        } else {
            //Jika bukan Admin maupun Customer
            next({ name : "Unauthorized "});
        }
    }
};