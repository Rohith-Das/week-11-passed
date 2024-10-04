const User = require('../model/userModel');

const isLogin = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user_id);
        if (req.session.user_id && user && user.is_blocked === 0) {
            return next(); 
        } else {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).send('Internal Server Error');
                }
                return res.redirect('/login');
            });
        }
    } catch (error) {
        console.error('Error in isLogin middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};
const isLogout = async (req, res, next) => {
    try {
        if (req.session.user_id) {
            const user =await User.findById(req.session.user_id)
            if(!user.is_blocked){
                return res.redirect('/home')
            }else{
                return next(); 
            }
            
        }else{
            return next();
        }
        
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    isLogin,
    isLogout
};