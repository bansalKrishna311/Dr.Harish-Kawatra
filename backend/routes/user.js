const express = require('express');
const router = express.Router();

const {login,signup,deleteUser } = require('../controllers/Loginsignup');

// for user login and signup
router.post('/login',login);
router.post('/signup',signup);

// notice

const {getUsers} = require('../controllers/Getusers');
router.get('/getUsers',getUsers)
router.delete("/:id", deleteUser)
module.exports = router;