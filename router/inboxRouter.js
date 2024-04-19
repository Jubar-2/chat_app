const express = require('express');
const { getInbox, searchUser, addConversation,getMessages,sendMessage } = require('../controller/inboxController');
const decorateHtmlResponsive = require('../middleware/common/decorateHtmlResponsive');
const { checkLogin } = require('../middleware/common/checkLogin');
const attachmentUpload = require('../middleware/inbox/attachmentUpload')

const router = express.Router()

router.get('/', decorateHtmlResponsive("inbox"), checkLogin, getInbox);
router.post('/search', searchUser);
router.post('/conversation',checkLogin, addConversation);
router.get("/messages/:conversation_id", checkLogin, getMessages);
router.post("/message", checkLogin, attachmentUpload, sendMessage);
module.exports = router;
