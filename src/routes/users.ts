import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} from '../controllers/users';
import { validateUpdateUserRequest, validateUpdateAvatarRequest, validateGetUserByIdRequest } from '../validators/user';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', validateGetUserByIdRequest, getUserById);
router.patch('/me', validateUpdateUserRequest, updateUser);
router.patch('/me/avatar', validateUpdateAvatarRequest, updateAvatar);

export default router;
