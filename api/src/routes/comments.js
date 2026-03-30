const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentsController");
const requireAuth = require('../middleware/auth');

router.post('/:id/comments', controller.createComment);
router.put('/:id/comments', controller.updateComment);
router.delete('/:id/comment',requireAuth,controller.deleteComment)