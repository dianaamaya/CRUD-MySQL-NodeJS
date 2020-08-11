const { Router } = require('express');
const router = Router();

// controllers 
const { getLink, createLink, updateLink, deleteLink, getUserLinks  } 
        = require('../controllers/links.controller');

// get user links, create a new link
router.route('/')
    .get( getUserLinks )
    .post( createLink ); 

// get a link, update a link, delete a link
router.route('/:id')
    .get( getLink )
    .put( updateLink )
    .delete( deleteLink );

module.exports = router;