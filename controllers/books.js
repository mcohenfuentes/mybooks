const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {

        const currentUser = await User.findById(req.session.user._id);

        res.render('books/index.ejs', {
            books: currentUser.books,
        });
    } catch (error) {

        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('books/new.ejs');
});

router.post('/', async (req, res) => {
    try {

        const currentUser = await User.findById(req.session.user._id);

        currentUser.books.push(req.body);

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/books`);
    } catch (error) {

        res.redirect('/');
    }
});

router.get('/:bookId', async (req, res) => {
    try {

        const currentUser = await User.findById(req.session.user._id);

        const book = currentUser.books.id(req.params.bookId);

        res.render('books/show.ejs', {
            book: book,
        });
    } catch (error) {

        res.redirect('/');
    }
});

router.delete('/:bookId', async (req, res) => {
    try {

        const currentUser = await User.findById(req.session.user._id);

        currentUser.books.id(req.params.bookId).deleteOne();

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/books`);
    } catch (error) {

        res.redirect('/');
    }
});

router.get('/:bookId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const book = currentUser.books.id(req.params.bookId);
        res.render('books/edit.ejs', {
            book: book,
        });
    } catch (error) {
        res.redirect('/');
    }
});

router.put('/:bookId', async (req, res) => {
    try {

        const currentUser = await User.findById(req.session.user._id);

        const book = currentUser.books.id(req.params.bookId);

        book.set(req.body);

        await currentUser.save();

        res.redirect(
            `/users/${currentUser._id}/books/${req.params.bookId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.get('/community/:userId/:bookId', async (req, res) => {
    try {
        console.log(req.params)
        const communityUser = await User.findById(req.params.userId);
        const book = communityUser.books.id(req.params.bookId);



        res.render('books/comShow.ejs', {
            book: book,
        });
    } catch (error) {

        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;