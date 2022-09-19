import { Router } from 'express';
import { getCards, createCard, deleteCard, addLike, removeLike } from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', addLike);
router.delete('/:id/likes', removeLike);

export default router;