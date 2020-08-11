const linksCtrl = {};
const pool = require('../database');

/**
 * get all links of the current user
 */
linksCtrl.getUserLinks = async (req, res) => {
    if(req.user.id) {
        const listLinks = await pool.query('SELECT * FROM links WHERE user_id=?', req.user.id);
        res.json(listLinks);  
    }
    else {
        res.json({status:"no session"});
    }
     
}

/**
 * create a new link to the current user
 */
linksCtrl.createLink = async (req, res) => {
    if(req.user.id) {
        const newLink = { title, url, description, type_id } = req.body;
        newLink.user_id = req.user.id;
        await pool.query('INSERT INTO links set ?', newLink);
        res.json({ status: true });   
    }
    else {
        res.json({status:"no session"});
    } 

}

/**
 * get only the link required
 */
linksCtrl.getLink = async (req, res) => {   
    if(req.user.id) { 
        const {id} = req.params;
        const link = await pool.query("SELECT * FROM links WHERE ID=? AND user_id=?", [id, req.user.id]);
        res.json(link[0]);  
    }
    else {
        res.json({status:"no session"});
    }  
}

/**
 * update a link
 */
linksCtrl.updateLink = async (req, res) => {

    if(req.user.id) {
        const {id} = req.params;
        const newLink= { title, url, description, type_id, user_id} = req.body;  
        await pool.query("UPDATE links SET ? WHERE id = ? AND user_id=?", [newLink, id, req.user.id]);
        res.json({status:true});
    }
    else {
        res.json({status:"no session"});
    } 
}

/**
 * delete a link
 */

linksCtrl.deleteLink = async (req, res) => {
    if(req.user.id) {
        const {id} = req.params;
        await pool.query("DELETE FROM links WHERE ID=? AND user_id=?", [id, req.user.id]);
        res.json({status:true});
    }
    else {
        res.json({status:"no session"});
    } 

}


module.exports = linksCtrl;