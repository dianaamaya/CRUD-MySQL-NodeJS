/**
 * to check if the user is authenticated or not
 */
module.exports = {
    checkAuthentication (req, res, next) {
        
        if (req.isAuthenticated()) {
            console.log("authenticated");
            return next();
        }
        console.log("no authenticated");
        return res.json({status:"no session"});
    }
};