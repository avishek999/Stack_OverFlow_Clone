import express from 'express'
import { AskQuestion,getAllQuestion,deleteQuestion, voteQuestion } from '../Controllers/Question.js'
import auth from '../Middlewares/auth.js';


const router = express.Router();

router.post('/Ask',auth,AskQuestion);
router.get('/get',getAllQuestion);
router.delete('/delete/:id',deleteQuestion);
router.patch('/vote/:id', voteQuestion);

export default router;