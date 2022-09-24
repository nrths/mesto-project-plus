import { Router } from 'express';
import { validateCreateCardRequest, validateCardId } from '../validators/cards';
import {
  getCards, createCard, deleteCard, addLike, removeLike,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.post('/', validateCreateCardRequest, createCard);
router.delete('/:id', validateCardId, deleteCard);
router.put('/:id/likes', validateCardId, addLike);
router.delete('/:id/likes', validateCardId, removeLike);

export default router;
