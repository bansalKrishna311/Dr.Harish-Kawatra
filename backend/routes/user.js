const express = require('express');
const router = express.Router();

const {login,signup,deleteUser } = require('../controllers/Loginsignup');

// for user login and signup
router.post('/login',login);
router.post('/signup',signup);

// notice
const {createNotice, getNotices, getNoticeByDate,getNoticeByBatch} = require('../controllers/Noticecontroller');
const {getUsers} = require('../controllers/Getusers');
router.post('/createNotice', createNotice);
router.get('/getNotices', getNotices);
router.post('/getNoticeByDate', getNoticeByDate);
router.post('/getNoticeByBatch', getNoticeByBatch);
router.get('/getUsers',getUsers)
router.delete("/:id", deleteUser)
module.exports = router;