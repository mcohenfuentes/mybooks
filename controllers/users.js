const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('users/index.ejs', { users: allUsers });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//'/users/:userId/users/:userId'
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        console.log(user)
        res.render('users/show.ejs', { user, books: user.books }); // Pass user data to show.ejs
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;