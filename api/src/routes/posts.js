const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const { requireAuth } = require('../middleware/auth.js');

router.get('/', controller.getAllPosts)
router.get('/:id', controller.getPost)

router.use(requireAuth);
router.post('/', controller.createPost);
router.put('/:id', checkPostOwnership, controller.updatePost);
router.delete('/:id', checkPostOwnership, controller.deletePost);
router.patch('/:id/publish', checkPostOwnership, controller.togglePublishStatus);
module.exports = router;