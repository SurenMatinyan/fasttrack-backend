import { Router } from "express";
import { validate } from "express-validation";
import UserController from "../controller/user.controller";
import * as authValidation from "../validators/auth.validators";
import * as userValidation from '../validators/user.validators'
import Auth from '../middleware/auth'
import isAdmin from "../middleware/isAdmin";

const router = Router();
router.post('/registration', validate(authValidation.registration), UserController.registration);
router.post('/autorization', validate(authValidation.authorization), UserController.authorization);
router.get('/allrequest', Auth as any, isAdmin as any, UserController.getAllRequest);
router.put('/acceptorreject', Auth as any, isAdmin as any, validate(userValidation.acceptOrReject), UserController.acceptOrReject);
router.post('/adminAuth', validate(authValidation.authorization), UserController.authAdmin)
router.get('/mypage', Auth as any, UserController.myPage);
router.get('/profile/:id', Auth as any, UserController.profile)



export default router;