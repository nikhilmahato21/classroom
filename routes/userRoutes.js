import express from 'express';

import { roleMiddleware } from '../middlewares/rolemiddleware.js';
import { getAllStudents, getAllTeachers, updateStudent, updateTeacher} from '../controllers/userController.js';


const router = express.Router();


router.get('/teachers', roleMiddleware(['Principal']), getAllTeachers);
router.put('/teachers/:id', roleMiddleware(['Principal']), updateTeacher);
router.get('/students', roleMiddleware(['Principal','Teacher']), getAllStudents);
router.put('/students/:id', roleMiddleware(['Principal','Teacher']), updateStudent);

export default router;