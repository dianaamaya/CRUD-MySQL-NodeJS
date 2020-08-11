const typesCtrl = {};
const pool = require('../database');

/**
 *  get all possible links types
 */
typesCtrl.getTypes = async (req, res) => {
    const listTypes = await pool.query('SELECT * FROM types');
    res.json(listTypes);
}

module.exports = typesCtrl;