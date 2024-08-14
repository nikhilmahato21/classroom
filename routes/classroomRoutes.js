import express from 'express';


import { assignStudent, assignTeacher, createClassroom, createStudent, createTeacher, createTimetable, getMyClassrooms } from '../controllers/classroomController.js';
import { roleMiddleware } from '../middlewares/rolemiddleware.js';

const router = express.Router();

router.post('/', roleMiddleware('Principal'), createClassroom);
 router.post('/create-teacher', roleMiddleware('Principal'), createTeacher);
 router.post('/create-student', roleMiddleware(['Principal', 'Teacher']), createStudent);
router.post('/assign-teacher', roleMiddleware('Principal'), assignTeacher);
router.post('/assign-student', roleMiddleware(['Principal', 'Teacher']), assignStudent);
router.post('/timetable', roleMiddleware('Teacher'), createTimetable); 
router.get('/my-classrooms',roleMiddleware(['Student', 'Teacher']),  getMyClassrooms);

export default router;
