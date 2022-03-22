const router = require('express').Router();
const { userUpdateValidator, avatarUpdateValidator } = require('../middlewares/userValidator');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUser);
router.patch('/me', userUpdateValidator, updateUser);
router.patch('/me/avatar', avatarUpdateValidator, updateAvatar);

module.exports = router;
