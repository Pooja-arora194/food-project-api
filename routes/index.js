import express from 'express';
const router = express.Router();
import itemController from '../Controller/itemController';

router.post('/additem', itemController.store);
router.get('/getitem', itemController.index); 
router.get('/singleitem/:id', itemController.showsingle); 

export default router;