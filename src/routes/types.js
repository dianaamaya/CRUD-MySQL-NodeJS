const { Router } = require('express');
const router = Router();

const { getTypes } = require('../controllers/types.controller');

//get links types
router.route('/')
    .get( getTypes );

module.exports = router;