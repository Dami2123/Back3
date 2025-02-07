import { Router } from 'express';
import mocksController from '../controllers/mocks.controller.js'
const router = Router();

router.get('/mockingpets',mocksController.getGeneratedPets )
router.get('/mockingusers',mocksController.getGeneratedUsers )
router.get('/generateUsersData/:number',mocksController.postGenerateUsers )
router.get('/generatePetsData/:number',mocksController.postGeneratePets)

export default router;