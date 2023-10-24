import express from 'express';

import {
  createUser,
  getUsers,
  getUserByUid
} from '../Controllers/user.js';

const router = express.Router();

router.post('/new', createUser);
router.get('/', getUsers);
router.get('/user/:uid', getUserByUid);
// router.put('/update/:id', updateProduct);
// router.delete('/delete/:id', deleteProduct);

export default router;