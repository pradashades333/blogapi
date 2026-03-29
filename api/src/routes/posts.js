const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController");
const requireAuth = require('../middleware/auth');

router.get('/', controller.getAllPosts)
router.get('/:id', controller.getPost)

router.post('/', controller.createPost);
router.put('/:id', requireAuth, controller.updatePost);
router.delete('/:id', requireAuth, controller.deletePost);
router.patch('/:id/publish', requireAuth, controller.togglePublishStatus);
module.exports = router;