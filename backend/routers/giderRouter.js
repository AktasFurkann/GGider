const router = require('express').Router();
const giderController = require('../controllers/giderController');

router.get('/' , giderController.giderleriListele);
router.post('/', giderController.giderEkle);
router.delete('/:gider_id', giderController.giderSil);


module.exports = router;