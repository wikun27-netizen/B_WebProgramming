const express = require('express');
const router = express.Router();

router.get('/login',
async(req, res) => {
    if (req.session.user){
        res.redirect('/');
    } else{
        res.render('pages/login');
    }
}
)

router.post('/login',
    async (req, res) => {
        //get user input
        const username = req.body.username;
        const password = req.body.password;

        //check username and password
        if (username === "admin" && password === "admin") {
            //create session for user
            req.session.user = "admin";
            //login success and redirect to member area
            res.redirect('/');
        } else {
            res.render('/pages/login', { layout: false, error: 'Wrong username or password ' });
        }
    }
);

router.get('/logout', 
    async (req, res) =>{
        //destroy all session
        req.session.destroy();

        //redirect to login
        res.redirect('/auth/login');
    }
)

module.exports = router;