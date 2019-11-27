import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinsController from './app/controllers/CheckinController';
import HelpOrdersController from './app/controllers/HelpOrdersController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

// Create Plans
routes.post('/plans', PlanController.store);

// List plans
routes.get('/plans', PlanController.index);

// Update plans
routes.put('/plans', PlanController.update);

// Delete Plans
routes.delete('/plans', PlanController.destroy);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);

routes.post('/students/checkins/:id', CheckinsController.store);

routes.get('/students/help-orders', HelpOrdersController.index);
routes.post('/students/:id/help-orders', HelpOrdersController.store);

routes.put('/students/:id/help-orders', AnswerController.update);
routes.get('/students/help-orders', AnswerController.index);

export default routes;
