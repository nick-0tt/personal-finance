import { Router } from "express";
import userRouter from "./users.mjs";
import expensesRouter from "./expenses.mjs";
import incomeRouter from "./income.mjs";

const router = Router();

router.use(userRouter);
router.use(expensesRouter);
router.use(incomeRouter);

export default router;