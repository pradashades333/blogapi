const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentsController");
const requireAuth = require('../middleware/auth');

router.post('/:id/comments',requireAuth, controller.createComment);
router.put('/:id/comments',requireAuth, controller.updateComment);
router.delete('/:id/comment',requireAuth,controller.deleteComment)

module.exports = router;
