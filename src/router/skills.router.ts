import { Router } from "express";
import { validate } from "express-validation";
import SkillController from "../controller/skill.controller";
import * as skillValidation from '../validators/skills.validators'
import Auth from '../middleware/auth'
import isAdmin from "../middleware/isAdmin";

const router = Router();


router.get('/serachusersbyskill', Auth as any, validate(skillValidation.searchUsersBySkills), SkillController.searchUsersBySkills)
router.get('/skilList', SkillController.skillList);

export default router