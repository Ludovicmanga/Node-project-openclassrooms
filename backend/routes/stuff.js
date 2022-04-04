const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.get('/:id', auth, stuffCtrl.getOneThing)
router.put('/:id', auth, multer, stuffCtrl.modifyOneThing);
router.delete('/:id', auth, stuffCtrl.deleteOneThing);

module.exports = router;