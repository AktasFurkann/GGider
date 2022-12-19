const router = require('express').Router();
const gelirController = require('../controllers/gelirController');

router.get('/' , gelirController.gelirleriListele);
router.post('/', gelirController.gelirEkle);
router.delete('/:gelir_id',gelirController.gelirSil);


module.exports = router;