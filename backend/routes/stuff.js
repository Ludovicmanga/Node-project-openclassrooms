const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middlewares/auth');

router.post('/', auth, stuffCtrl.createThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.get('/:id', auth, stuffCtrl.getOneThing)
router.put('/:id', auth, stuffCtrl.modifiyOneThing);
router.delete('/:id', auth, stuffCtrl.deleteOneThing);

module.exports = router;