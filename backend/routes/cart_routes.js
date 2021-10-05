const express = require('express');
const router = express.Router();
const { cart } = require('../controllers');
const auth = require('../middlewares/authorization');

router.get('/:userId', auth, cart.fetchAll);
router.post('/userId', auth, cart.add);
router.patch('/:cartId', auth, cart.update);
router.delete('/:cartId', auth, cart.delete);

module.exports = router;
