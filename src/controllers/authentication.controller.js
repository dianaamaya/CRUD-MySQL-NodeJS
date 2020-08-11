const authenticationCtrl = {};
const passport = require('passport');

/**
 * sign up user in database by local strategy
 */
authenticationCtrl.register = async (req, res, next) => {
    await passport.authenticate('local.signup', function(err, user, info) {
        if(user) {
            res.json({id:user.id});
        }
        else res.json({status:info});
    })(req, res, next);
}

/**
 * sign in user by local strategy
 */
authenticationCtrl.login = (req, res, next) => {
    req.check('username', 'Username is Required').notEmpty();
    req.check('password', 'Password is Required').notEmpty();
    const errors = req.validationErrors();
    if (errors.length > 0) {
        res.json({status:info});
    }
    passport.authenticate('local.signin', function(err, user, info) {          
        if(user) {
            res.json(user);           
        }
        else res.json({status:info});
    })(req, res, next);
  }

/**
 * log out user
 */
authenticationCtrl.logout = (req, res) => {
    req.logout();
    res.json({status:true});
}
    

module.exports = authenticationCtrl;